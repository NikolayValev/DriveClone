
const testFolder = './test/';
import { promises as fs } from 'fs'
import path from 'path'
// A list of all paths.
let paths: Array<any> = []

// File path mapper options
interface FilePathMapperOptions {
  startDirectory: string
}

/**/
/*
localServer::filePathMapper() localServer::filePathMapper()

NAME

        filePathMapper(req, res, next)
          - deletes a file on the local machine based on its id.

SYNOPSIS

        filePathMapper({ startDirectory }: FilePathMapperOptions)
            startDirectory             --> the directory to start with

DESCRIPTION

        This function will call the async searchFiles with the starting
        directory and put the return from that function into a object to be
        used by the web client.

RETURNS

        Returns a object with a boolean property ok and paths that holds all the
        filepaths in the directory.
*/
/**/
export async function filePathMapper({ startDirectory }: FilePathMapperOptions) {

  try {
    // Searches for all files in the start directory.
    const paths = await searchFiles(startDirectory)
    return {
      ok: true,
      paths
    }
  } catch (err) {
    console.error(err)
    return {
      ok: false,
      message: err.message
    }
  }
}
/**
 * Wrapper to get all the files.
 * @returns the retun from filePathMapper()
 */
async function getAllFiles() {
  //new
  return filePathMapper({
    startDirectory: './test'
  })
}

/**
 *  Gets the file path of the file based on its name
 * @param fileName The name of the file whose path to get
 * @returns
 */
async function getFile(fileName: string) {
  //const directoryPath = __basedir + "";
  const directoryPath = testFolder;
  return directoryPath + fileName;
}

/**/
/*
localServer::uploadFile() localServer::uploadFile()

NAME

        uploadFile(file)
          - uploads a file to the uploads folder.

SYNOPSIS

        uploadFile(file)
            file             --> filedescriptor of the file to be uploaded

DESCRIPTION

        This function upload a file passed to it to the uploads folder.

RETURNS

        Returns a string signifing if the file was uploaded of if it failed.
*/
/**/
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
/**/
/*
localServer::makeDirectory() localServer::makeDirectory()

NAME

        makeDirectory(path,folderName)
          - deletes a file on the local machine based on its id.

SYNOPSIS

        makeDirectory(path,folderName)
            path             --> the path object
            folderName             --> the name of the folder to be created

DESCRIPTION

        This function will make a new directory.

RETURNS

        Returns a an error if the creation failed.
*/
/**/
function makeDirectory(path,folderName:string) {
  //todo make recursive
  fs.mkdir(path.join(__dirname, folderName), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');
  });
}
/**/
/*
localServer::deleteFile() localServer::deleteFile()

NAME

        deleteFile(filePath)
          - deletes a file on the local machine based on its path.

SYNOPSIS

        deleteFile(filePath)
            filePath             --> the path of the file to be deleted

DESCRIPTION

        This function will delete a file based on the path that is passed to it.

RETURNS

        Returns a promise of the deleted file
*/
/**/
async function deleteFile(filePath) {
  const fs = require('fs').promises;
  try {
    await fs.unlink(filePath);
    console.log(`Deleted ${filePath}`);
  } catch (error) {
    console.error(`Got an error trying to delete the file: ${error.message}`);
  }

}
/**/
/*
localServer::moveFile() localServer::moveFile()

NAME

        moveFile(source, destination)
          - moves a file on the local machine

SYNOPSIS

        moveFile(source, destination)
            startDirectory             --> the directory to start with

DESCRIPTION

        This function will call the async fs function rename that would change
        the path object of the file.

RETURNS

        Returns a promise of the moved file.
*/
/**/
async function moveFile(source, destination) {
  try {
    await fs.rename(source, destination);
    console.log(`Moved file from ${source} to ${destination}`);
  } catch (error) {
    console.error(`Got an error trying to move the file: ${error.message}`);
  }
}
/**/
/*
localServer::searchFiles() localServer::searchFiles()

NAME

        searchFiles(req, res, next)
          - Searches a directory recursevely and mapps its contents to an object

SYNOPSIS

        searchFiles(folderName: string, extensions?: string[])
            folderName             --> the directory to start with
            extensions             --> the extension which to include(optional)

DESCRIPTION

        This function will recursevely search the directory and returns an
        object with the formatted contents. It calls itself on every child
        directory and saves the filedescriptors in a json response

RETURNS

        Returns a object with a boolean property ok and paths that holds all the
        filepaths in the directory.
*/
/**/
export async function searchFiles(folderName: string, extensions?: string[]) {
  // Reads the contents of a folder.
  const folderChildren = await fs.readdir(folderName)
  //console.log(folderChildren)
  // Returns a list of all child folders.
  for (const child of folderChildren) {
    const childPath = `${folderName}/${child}`
    const childStats = await fs.lstat(childPath)

    // Search all files in a directory recursively.
    if (childStats.isDirectory()) {
      await searchFiles(childPath, extensions)
    }

    if (childStats.isFile()) {
      const extension = child.split('.').pop() || ''
      // Checks if a file has any of the given extensions.
      const skipFile = extensions?.length
        ? !extensions.includes(extension)
        : false

      if (skipFile) continue

      // Reads a file and returns its contents.
      const fullPathToFile = path.resolve(childPath)
      const fileContent = await fs.readFile(fullPathToFile)
      // Adds a full path to the file.
      paths = [
        ...paths,
        {
          path: fullPathToFile,
          data: fileContent
        }
      ]
    }

  }

  return paths
}
module.exports = {
  getAllFiles,
  getFile,
  uploadFile,
  makeDirectory,
  deleteFile,
  moveFile
}