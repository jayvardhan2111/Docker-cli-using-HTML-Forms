
const host = ""     // enter domain or ip of the instance

function listContainer() {
  const myHTTP = new XMLHttpRequest();
  const url = "http://"+host+":3000/listcontainer";
  myHTTP.open("GET", url, false);
  myHTTP.send();
  document.getElementById("outputBox").innerHTML = myHTTP.responseText;
}

function createImage() {
  const myHTTP = new XMLHttpRequest();
  const imageName = document.getElementById("imageNameInput").value;
  const fileContent = document.getElementById("fileContentInput").value;
  if (imageName == "") {
    alert("Image Name Can't Be Null");
    return;
  }
  if (fileContent == "") {
    alert("File Content Can't Be Null");
    return;
  }
  listOfDockerfileLines = fileContent.split("\n");
  const url =
    "http://"+host+":3000/createimage?imagename=" +
    imageName +
    "&dockerfilecontent=" +
    listOfDockerfileLines;
  myHTTP.open("GET", url, false);
  myHTTP.send();
  document.getElementById("outputBox").innerHTML = myHTTP.responseText;
}

function listImages() {
  const myHTTP = new XMLHttpRequest();
  const url = "http://"+host+":3000/listimages";
  myHTTP.open("GET", url, false);
  myHTTP.send();
  console.log(myHTTP.responseText);
  document.getElementById("outputBox").innerHTML = myHTTP.responseText;
}

function createContainer() {
  const myHTTP = new XMLHttpRequest();
  const containerName = document.getElementById("cname").value;
  if (containerName == "") {
    alert("Container Name Can't Be Null");
    return;
  }
  console.log(containerName);
  const containerImage = document.getElementById("cimage").value;
  if (containerImage == "") {
    alert("Container Image Name Can't Be Null");
    return;
  }
  console.log(containerImage);
  const url =
    "http://"+host+":3000/run?cname=" +
    containerName +
    "&cimage=" +
    containerImage;
  console.log(url);

  myHTTP.open("GET", url, false);
  myHTTP.send();
  console.log(myHTTP.responseText);
  document.getElementById("outputBox").innerHTML = myHTTP.responseText;
}

function deleteContainer() {
  const myHTTP = new XMLHttpRequest();
  const containerName = document.getElementById("deleteConatainerName").value;
  if (containerName == "") {
    alert("Container Name Can't Be Null");
    return;
  }
  console.log(containerName);
  const url = "http://"+host+":3000/deletecontainer?dname=" + containerName;
  console.log(url);

  myHTTP.open("GET", url, false);
  myHTTP.send();
  console.log(myHTTP.responseText);
  document.getElementById("outputBox").innerHTML = myHTTP.responseText;
}

function deleteImage() {
  const myHTTP = new XMLHttpRequest();
  const imageName = document.getElementById("deleteImageName").value;
  if (imageName == "") {
    alert("Image Name Can't Be Null");
    return;
  }
  console.log(imageName);
  const url = "http://"+host+":3000/deleteimage?iname=" + imageName;
  console.log(url);

  myHTTP.open("GET", url, false);
  myHTTP.send();
  console.log(myHTTP.responseText);
  document.getElementById("outputBox").innerHTML = myHTTP.responseText;
}

function displayImage() {
  console.log("changing visibility");
  containerForms = document.getElementsByClassName("container");
  for (const containerForm of containerForms) {
    containerForm.style.display = "none";
  }
  imageForms = document.getElementsByClassName("image");
  for (const imageForm of imageForms) {
    imageForm.style.display = "block";
  }
}

function displayContainer() {
  console.log("changing visibility");
  containerForms = document.getElementsByClassName("container");
  for (const containerForm of containerForms) {
    containerForm.style.display = "block";
  }
  imageForms = document.getElementsByClassName("image");
  for (const imageForm of imageForms) {
    imageForm.style.display = "none";
  }
}
