
const testFolder = './test/';
const fs = require('fs');

async function getAllFiles() {

  let contents=[];
  fs.readdirSync(testFolder).forEach(file => {
    console.log(file);
    contents.push(file);
  });
  return contents;
}

async function getFile(fileName) {
  //const directoryPath = __basedir + "";
  const directoryPath = testFolder;
  return directoryPath + fileName;
  //moved to controller
  /*return res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
  */
}

function uploadFile(file) {
  let sampleFile = file;
  let uploadPath = testFolder + '/uploads/' + sampleFile.name;;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err)
      return send(err);

    return send('File uploaded!');
  });
}

function makeDirectory(path) {
  //todo make recursive
  fs.mkdir(path.join(__dirname, 'test'), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');
  });
}

function deleteFile(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}

function deleteDirectory(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}
module.exports = {
  getAllFiles,
  getFile,
  uploadFile,
  makeDirectory,
  deleteFile,
  deleteDirectory
}