var Userdb = require('../model/model');

//create and save new user
exports.create = (req,res)=>{
    //validate request

    if(!req.body){
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }

    //new User
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in the database

    user
     .save(user)
     .then(data=>{
        //res.send(data)
        res.redirect('/add-user')
     })
     .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured in creating operation"
        });
     }); 


}


//retriive and return all users / retrive and return a single user

exports.find = (req,res)=>{

    if(req.query.id){

        const id = req.query.id;
        Userdb.findById(id)
         .then(data =>{
            if(!data){
                res.status(404).send({message: "Not Found user with ID " + id})
            }else{
                res.send(data)
            }
         })
         .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occured while retriving userr information"
            });
         });

    }else{
        Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occured while retriving userr information"
            });
        });
    }


   
}

// Update a new identidied user by user Id

exports.update = (req,res)=>{

    if(!req.body){
        return res
         .status(400)
         .send({message:"Data to Update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindandModify:false})
     .then(data=>{
        if(!data){
            res.status(404).send({message:'Cannot update user with ${id}. Maybe user not found'});
        }else{
            res.send(data);
        }
     })
     .catch(err=>{
        res.status(500).send({
            message:"Error Updating User Information"
        });
    });

}

// Delete a User with a specified user ID in the request

exports.delete = (req,res)=>{

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
     .then(data =>{
        if(!data){
            res.status(404).send({message:'Cannot delete user with ${id}. Maybe user wrong'});
        }else{
            res.send({message:"User wass deleted succesfully"});
        }
     })
     .catch(err=>{
        res.status(500).send({
            message:"Could not delete Usser with id = "+id
        });
    });

}