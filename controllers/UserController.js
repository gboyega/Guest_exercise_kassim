const users = [
    {"user1": {
    name: "mahesh",
    password: "password1",
    profession: "teacher",
    id: 1}},

  {"user2": {
    name: "suresh",
    password: "password2",
    profession: "librarian",
    id: 2
  }},

  {"user3": {
    name: "ramesh",
    password: "password3",
    profession: "clerk",
    id: 3
  }}
];


module.exports.readAllUsers = (req, res) => {
    res.status(200).send(users);
};

module.exports.createNewUser = (req, res) => {
    const user = req.body;
    if(user.name && user.password && user.profession){
        users.push({
            user:{
                name: user.name,
                password: user.password,
                profession: user.profession,
                id: `${users.length+1}`
            }});

            res.status(201).json({ message: "User created successfully" });
    } else {
        res.status(401).json({ message: "invalid User" });
    }

};

module.exports.deleteUser = (req, res) => {
    var user;
    for(i=0; i<users.length; i++){
        if ((i+1) == req.params.id){
            user = users[i];
        }
    }
    
    if(user){
        users.splice(users.indexOf(user), 1)
        return res.status(200).send({message: "User deleted successfully"});
    } else {
        return res.status(404).send({message: "User not found"})
    }

};

module.exports.readOneUser = (req, res) => {
     var user;
     for (i = 0; i < users.length; i++) {
       if (i + 1 == req.params.id) {
         user = users[i];
       }
     }

     if (user) {
       return res.status(200).send(user);
     } else {
       return res.status(404).send({ message: "User not found" });
     }
}