const fs = require('fs');
const AWS = require('aws-sdk');
require("dotenv").config();


const ID = process.env.ID;
const SECRET = process.env.SECRET;
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

console.log(s3);
const uploadFile = fileName => {
  const fileContent = fs.readFileSync(fileName);
  
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileContent
  };
  
  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

uploadFile("images.png");