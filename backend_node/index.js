const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Routes = express.Router();


const port = 5000;
const db = "profile";
const uri = "//127.0.0.1:27017/";


//schema
let Profile = require('./profile.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb:'+uri+db, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false});
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongo db connected');
});

// GET
Routes.route('/list').get((req,res)=>{
    Profile.find((err,profile)=>{
        if(err){
            console.log(err);
        }else{
            res.json(profile);
        }
    });
});

// GET for UPDATE
Routes.route('/:id').get((req,res)=>{
    let id = req.params.id;
    Profile.findById(id, (err,profile)=>{
        res.json(profile);
    });
});


// POST
Routes.route('/create').post((req,res)=>{
    //let newProfile = new Profile(req.body);

    const newProfile = new Profile({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName
      })


    newProfile.save().then(newProfile =>{
        res.status(200).json({'profile': 'profile added successfully'});
    }).catch(err =>{
        res.status(400).send('adding new profile failed');
    });
    
    console.log(newProfile);
    
});


// PUT
Routes.route('/update/:id').put((req,res)=>{
    Profile.findById(req.params.id, (err,profile)=>{
        if(!profile){
            res.status(404).send('data is not found');
        }else{

            profile.firstName = req.body.firstName;
            profile.middleName = req.body.middleName;
            profile.lastName = req.body.lastName;
            profile.save().then(profile=>{
                res.json('profile updated');
            }).catch(err =>{
                res.status(400).send('update not possible');
            });
        }
    });
});


//DELETE
Routes.route('/delete/:id').delete((req,res)=>{
    Profile.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
            res.json(doc);
            console.log('profile deleted')
        }else{
            console.log(err);
        }
    });
});

app.use('/profile',Routes);

app.listen(port, ()=>{
    console.log("server is running in port: "+port);
});
