require("dotenv").config();
const multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");
var upload = multer({ dest: "temp/", limits: { fieldSize: 8 * 1024 * 1024 } });
const id = process.env.ID;
const secret = process.env.SECRET;
const bucket = process.env.BUCKET_NAME;
const uploads = [];
const s3 = new AWS.S3({
  accessKeyId: id,
  secretAccessKey: secret
});

module.exports = app => {
  app.route("/viewUploads")
  .get((req, res) => {
    res.status(200).send(uploads);
  });

  app.route("/uploadFile")
  .post(upload.single("file"), (req, res) => {
    if (!req.file) {
      res.status(415).json({ message: "invalid upload request" });
    }
    var file = fs.readFileSync(req.file.path, "utf8");
    const params = {
      Bucket: bucket,
      Key: `${req.body.filename || req.file.originalname}`,
      Body: file,
      acl: "public-read"
    };

    s3.upload(params, function(err, data) {
      if (err) {
        res.status(500).json({ message: "internal server error" });
        throw err;
      }
      var newFile = {
        "File Name": `${req.body.filename || req.file.originalname}`,
        Link: `${data.Location}`,
        id: uploads.length + 1
      };
      uploads.push(newFile);
      res.status(201).send(newFile);
    });
  });

  app.route("/viewUpload/:id")
  .get((req, res) => {
    var upload;
    for (i=0; i<uploads.length; i++){
      if (uploads[i].id == req.params.id){
        upload = uploads[i];
      }
    };
    if (upload){
      res.status(200).send(upload)
    } else {res.status(404).json({ message:"upload not found" })}
  })
};
