require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const fs = require('fs');
const bodyParser = require('body-parser');
let file;


//   Middlewares

app.use(bodyParser.json({limit: '20MB'}));
app.use(bodyParser.urlencoded({}));




//FUNCTIONS
const loadFile = () => file = JSON.parse(fs.readFileSync(process.env.DB, 'utf-8'));
const saveFile = ()=> file = fs.writeFileSync(process.env.DB, JSON.stringify(file));
const searchPerson = (id)=> file.find(person => parseInt(person.id)===parseInt(id));
//ROUTES
app.get('/',(req,res,next) => {
    loadFile();
    res.send(file);
    
});
app.get('/',(req,res,next)=>{
    loadFile();
    res.send(file);
});

app.post('/',(req,res,next)=>{
    try{
        loadFile();
        const object = req.body;
        const id = file.length + 1;
        file.push({id,...object});
        saveFile();
        res.sendStatus(200);
        res.end;
    }catch(err){
        next(err);
    };
    
});
app.put("/:id", (req,res,next)=>{
   try {
        loadFile();
        const result = searchPerson(req.params.id);
        Object.assign(result,{...req.body});
        saveFile();
        res.sendStatus(200);
        res.end();
    }catch(err){
        next(err);
    }
});
app.delete("/:id",(req,res,next)=>{
    try{
        loadFile();
        const result = searchPerson(req.params.id);
        Object.assign(result,{deleted:true,deletedAt: new Date()});
        saveFile();
        res.sendStatus(200);
        res.end;
    }catch(err){
        next(err);
    };
    
});

// END ROUTES
app.listen(PORT,()=>{
    console.log(`Running in port ${PORT}`);
});

