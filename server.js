const express = require("express");
const { exec } = require("child_process");

const app = express();

app.use(express.static(__dirname));

app.get('/',(req,res) => {
	
	res.sendFile(__dirname+"/index.html")
})




app.get("/run", (req, res) => {
  const cname = req.query.cname;
  const cimage = req.query.cimage;
  q = "docker run -itd --name " + cname + " " + cimage;
  exec(q, (err, stdout, stderr) => {
    console.log(err);
    console.log(stderr);
    res.send("<pre>" + stdout + "</pre>");
  });
});

app.get("/listcontainer", (req, res) => {
  q = "docker ps";
  exec(q, (err, stdout, stderr) => {
    console.log(err);
    console.log(stderr);
    res.send("<pre>" + stdout + "</pre>");
  });
});

app.get("/deleteimage", (req, res) => {
  var iname = req.query.iname;
  q = "sudo docker image rm -f  " + iname;
  exec(q, (err, stdout, stderr) => {
    console.log(err);
    console.log(stderr);
    res.send("<pre> Deleted " + stdout + "</pre>");
  });
});

app.get("/listimages", (req, res) => {
  q = "docker images";
  exec(q, (err, stdout, stderr) => {
    console.log(err);
    console.log(stderr);
    res.send("<pre>" + stdout + "</pre>");
  });
});

app.get("/deleteimage", (req, res) => {
  var iname = req.query.iname;
  q = "sudo docker image rm -f  " + iname;
  exec(q, (err, stdout, stderr) => {
    console.log(err);
    console.log(stderr);
    res.send("<pre> Deleted " + stdout + "</pre>");
  });
});

function emptyExistingDockerFile() {
  command = ": > Dockerfile";
  exec(command, (err, stdout, stderr) => {
    console.log(err);
    console.log(stderr);
  });
}

function createDockerFile(fileContent) {
  dockerfileLines = fileContent.split(",");
  dockerfileLines.forEach(async (line) => {
    writeInFileCommand = 'echo "' + line + '" >>Dockerfile';
    console.log(writeInFileCommand);
    await exec(writeInFileCommand, (err, stdout, stderr) => {
      console.log(err);
      console.log(stderr);
    });
  });
}

async function buildDockerImage(imageName, res) {
  buildImageCommand = "docker build -t " + imageName + " .";
  await exec(buildImageCommand, (err, stdout, stderr) => {
    console.log(err);
    console.log(stderr);
    listDockerImageCommand = "docker images | grep " + imageName;
    exec(listDockerImageCommand, (err, stdout, stderr) => {
      console.log(err);
      console.log(stderr);
      res.send("<pre>" + stdout + "</pre>");
    });
  });
}

app.get("/createimage", (req, res) => {
  var imageName = req.query.imagename;
  var fileContent = req.query.dockerfilecontent;
  console.log("imageName");
  console.log(imageName);
  console.log("fileContent");
  emptyExistingDockerFile();
  createDockerFile(fileContent);
  console.log("file is created");
  buildDockerImage(imageName, res);
});

app.get("/deletecontainer", (req, res) => {
  var dname = req.query.dname;
  q = "sudo docker rm -f " + dname;
  exec(q, (err, stdout, stderr) => {
    console.log(err);
    console.log(stderr);
    res.send("<pre>" + stdout + "</pre>");
  });
});

app.listen(3000, () => {
  console.log("web app is running");
});
