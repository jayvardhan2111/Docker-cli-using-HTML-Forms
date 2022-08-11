const express = require('express')
const {exec} = require('child_process')

const app = express()

app.get('/',(req,res) => {
	
	res.sendFile(__dirname+"/index.html")
})


app.get('/run',(req,res)=>{
	
    const cname = req.query.cname
    const cimage = req.query.cimage
    q = "docker run -itd --name "+cname+" "+cimage
    exec(q,(err,stdout,stderr)=>{
        console.log(err)
        console.log(stderr)
         res.send("<pre>"+stdout+"</pre>")
    })

})

app.get('/listcontainer',(req,res)=>{

    q = "docker ps"
    exec(q,(err,stdout,stderr)=>{
        console.log(err)
        console.log(stderr)
         res.send("<pre>"+stdout+"</pre>")
    })

})

app.get('/deleteimage',(req,res)=>{

    var iname = req.query.iname
    q = "sudo docker image rm -f  "+iname
    exec(q,(err,stdout,stderr)=>{
        console.log(err)
        console.log(stderr)
         res.send("<pre> Deleted "+stdout+"</pre>")
    })

})

app.get("/listimages", (req, res) => {
  q = "docker images";
  exec(q, (err, stdout, stderr) => {
    console.log(err);
    console.log(stderr);
    res.send("<pre>" + stdout + "</pre>");
  });
});


app.get('/deleteimage',(req,res)=>{

    var iname = req.query.iname
    q = "sudo docker image rm -f  "+iname
    exec(q,(err,stdout,stderr)=>{
        console.log(err)
        console.log(stderr)
         res.send("<pre> Deleted "+stdout+"</pre>")
    })

})

app.get('/deletecontainer',(req,res)=>{

    var dname = req.query.dname
    q = "sudo docker rm -f "+dname
    exec(q,(err,stdout,stderr)=>{
        console.log(err)
        console.log(stderr)
         res.send("<pre>"+stdout+"</pre>")
    })

})

app.listen(3000,()=>{console.log('web app is running')})
