var aFiles = [];

const myDropzone = new Dropzone("#fileUploader", { 
  /*
  Options: https://github.com/dropzone/dropzone/blob/main/src/options.js
  https://docs.dropzone.dev/configuration/basics/configuration-options
  */
  // dictDefaultMessage: 'Arrastra los archivos aquí para subirlos', 
  dictRemoveFile: 'Quitar', 
  method: "post", 
  // url: "http://localhost/testFilesUploaded/php/testDropzone.php", 
  url: "./php/testDropzone/tmpupload.php", 
  paramName: "file", // El nombre que se utilizará para transferir el archivo.
  maxFilesize: 2, // MB
  // maxFiles: 3, 
  acceptedFiles: ".gif, .jpeg, .jpg, .png, .GIF, .JPEG, .JPG, .PNG", // Example: "image/*,image/png,application/pdf,.doc,.docx"
  addRemoveLinks: true, 
  accept: (file, done) => {
    /*
    if (file.name == "justinbieber.jpg") {
      done("Naha, you don't.");
    }else{
      done();
    }
    */
    done();
  }
});

/*
Events:
https://docs.dropzone.dev/configuration/events
https://github.com/dropzone/dropzone/blob/main/src/options.js#L574
*/
myDropzone.on("addedfile", file => {
  aFiles.push(file);
});
myDropzone.on("removedfile", file => {
  let index = aFiles.indexOf(file);
  aFiles.splice(index, 1);
});
/*
myDropzone.on("sending", file => {
  console.log(`Se inició la carga del archivo ${file.name}`);
});
myDropzone.on("success", (file, message) => {
  console.log('Ok');
});
myDropzone.on("error", (file, message) => {
  console.log("Error del servidor:", message);
});
myDropzone.on("queuecomplete", () => {
});
myDropzone.on("uploadprogress", (file, progress) => {
});
*/

const send = (form) => {
  Promise.all(aFiles.map(file => {
    let oFormData = new FormData();
    oFormData.append('file', file);

    return fetch('./php/testDropzone/upload.php', {
      headers: {
        'Accept': 'application/json'
      },
      method: 'POST',
      body: oFormData
    });
  }))
  .then((aResponse) => {
    aFiles = [];
    myDropzone.removeAllFiles(true);
    console.log('Ok');

    aResponse.forEach(oResponse => {
      // console.log(oResponse);
    });
  })
  .catch((oError) => {
    console.log('Error');
    console.log(oError);
  });

  return false;
}