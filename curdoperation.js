//import express module
const exp =require("express");
//create express obj
const app =exp();

//import monodb
const mc=require("mongodb").MongoClient;



// assign port number
app.listen(2000,()=>{
    console.log("server is running in port number 2000..")
})

//body parsing method
app.use(exp.json());


// connect to the db server
var dbo;
const dbUrl="mongodb://admin:admin@cluster0-shard-00-00-izra5.mongodb.net:27017,cluster0-shard-00-01-izra5.mongodb.net:27017,cluster0-shard-00-02-izra5.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
 mc.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,clientObj)=>{
    if(err)
    {
        console.log("err is conn",err);
    }
    else
    {
    //connect to database
    dbo=clientObj.db("empdb");
    console.log("connected to db");
    }
});













//write get handler request
app.get('/readAll',(req, res)=>{

// read data from db and convert into array
dbo.collection("empcollection").find().toArray((err,empArray)=>{
    if(err)
    {
        console.log("err in read",err);
    }
    //check length of empArray
    else if(empArray.length==0){
        res.send({message:"no employee found"});
    }
    else{
        res.send({message:empArray});
    }
})

});


// readOne emp data operation in get handeler req.
app.get('/readOne/:eno',(req,res)=>{
    //get url parameters from req obj
    console.log(req.params);
    //convert string into number
    let emp1=(+req.params.eno);
    //read one emp obj.
    dbo.collection("empcollecion").findOne({empno:emp1},(err,empObj)=>{
        console.log(empObj)
        console.log(emp1)
        if(err)
        {
            console.log("err in read on emp ",err);
        }
        //if else not existed ,them embObj is null
        else if(empObj==null){
            res.send({message:"emp does not exist"})
        }
        else{
            res.send({message:empObj})
        }
    })
});


















// write put handler req.
app.put('/update',(req, res)=>{
    res.send({message:"read all req handler"})
    });

    













// write post handler req.
app.post('/register',(req, res)=>{
 
      console.log("data is ",req.body);
      //insert obj of req.body into empcollection
      dbo.collection("empcollecion").insertOne(req.body,(err,result)=>{
          if(err){
              console.log("err is insert",err);
          }
          else{
              res.send({message:"emp created successfully"})
          }
      })
  });


  //POST request handlr one
  app.post('/register',(req, res)=>{
      console.log("data is ",req.body);
      //check for emp obj with received eno.
      dbo.collection("empcollection").findOne({eno:req.body.eno},(err,empObj)=>{
          if(err)
          {
              console.log("err in find",err);
          }
          //if emp not existed
          else if(empObj==null)
          {
              //insert req.body
              dbo.collection("empcollection").insertOne(req.body,(err,result)=>{
                  if(err)
                  {
                      console.log("err in insert",err);
                  }
                  else{
                      res.send({message:"emp created successifully"});
                  }
              })
          }
          //if else already exist
          else{
              res.send({message:"already exist data"});
          }
      })
  })
 












    
    
//  delete req handler

app.delete('/remove/:empno',(req, res)=>{
    
        console.log(req.params);
        //convert string into "eno" to number
        let empno=(+req.params.eno);
        //delete using empno
        dbo.collection("empcollecion").deleteOne({eno:empno},(err,result)=>{
            if(err)
            {
                console.log("err in delete",err);
            }
            else{
                res.send({message:"emp remove"});
            }
        })
    })



     