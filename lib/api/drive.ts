import clientPromise from '@/lib/mongodb';
import { time } from 'console';
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
import { Stats } from 'fs';

// Export interface Folder.
export interface Folder {
  parent_directory: Folder;
  machine_friendly_name: string;
  name: string;
  path: string;
}

// Exports a machine - friendly name to a file.
export interface Files {
  parent_directory: Folder;
  machine_friendly_name: string;
  name: string;
  path: string;
}

// Export the timestamp as a Timestamp.
export interface Times {
  new(): Date;
}

// Export interface stats.
export interface Stats {
  dev: number //  ID of device containing file
  in: number// inode number
  mode: string//  protection
  n_hard_links: number//  number of hard links
  uId: string//   user ID of owner
  gId: string//   group ID of owner
  rDev: string// device ID (if special file)
  sizeInBytes: number//  total size, in bytes
  blksize: number //  blocksize for file system I/O
  blocks: number//  number of 512B blocks allocated
  accessTme: Times //  time of last access
  modTime: Times//  time of last modification
  lastStatusChange: Times//  time of last status change
}

// Export the interface to a DriveProps object
export interface DriveProps {
  machine_friendly_name: string;
  name: string;
  user: string;
  ip_address: string;
  port: string;
  image: string;
  description: string;
  //fix this to have a proper type
  contents: Array<any>;
  newContents: any;
}

export const placeholderDescription = `idk`;
/**
 *
 * @param machine_friendly_name
 * @returns
 */
export async function getDrive(machine_friendly_name: string): Promise<DriveProps | null> {
  const client = await clientPromise;
  const collection = client.db('test').collection('Devices');
  const results = await collection.findOne(
    { machine_friendly_name },
    { projection: { _id: 0 } }
  );

  if (results) {
    return results;
  } else {
    return null;
  }
}
/**
 *
 * @returns
 */
export async function getFirstDrive(): Promise<DriveProps | null> {
  const client = await clientPromise;
  const collection = client.db('test').collection('Devices');
  const results = await collection.findOne(
    {},
    {
      projection: { _id: 0 }
    }
  );
  return { ...results };
}
/**
 *
 * @returns
 */
export async function getAllDrives(): Promise<ResultProps[]> {
  const client = await clientPromise;
  const collection = client.db('test').collection('Devices');
  const final = await collection
    .aggregate([
      {
        $sort: {
          displayName: 1
        }
      },
      {
        $limit: 100
      },
    ])
    .toArray();
  return { ...final }
}
/**
 *
 * @param query
 * @returns
 */
export async function searchDrive(query: string): Promise<DriveProps[]> {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  return await collection
    .aggregate([
      {
        $search: {
          index: 'name-index',
          /*
          name-index is a search index as follows:

          {
            "mappings": {
              "fields": {
                "followers": {
                  "type": "number"
                },
                "name": {
                  "analyzer": "lucene.whitespace",
                  "searchAnalyzer": "lucene.whitespace",
                  "type": "string"
                },
                "username": {
                  "type": "string"
                }
              }
            }
          }

          */
          text: {
            query: query,
            path: {
              wildcard: '*' // match on both name and username
            },
            fuzzy: {},
          }
        }
      },
      // limit to 10 results
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0,
          emailVerified: 0,
          score: {
            $meta: 'searchScore'
          }
        }
      }
    ])
    .toArray();
}
/**
 *
 * @returns
 */
export async function getDriveCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('test').collection('Devices');
  return await collection.countDocuments();
}
/**
 *
 * @param machine_friendly_name
 * @param ip
 * @returns
 */
export async function updateDrive(machine_friendly_name: string, ip: string) {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  return await collection.updateOne({ machine_friendly_name }, { $set: { ip } });
}
//Function to sync the fs with the DB and populate in memory storage
export async function fetchFromLocalServer() {
  try {
    // TODO might need to change the headers
    const response = await fetch('http://localhost:7000/api', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const directoryContents = await response.json();
      //pass the directory contents to the DB
      console.log(directoryContents);
      return JSON.stringify(directoryContents);
    } else if (response.status === 401) {
      //Not authorized.
    } else {
      //Error
    }
  } catch (error) {
    console.error(error);
  }
};
/**
 *
 * Moved to using a bucket for storage and interaction from the client.
 */
/*
async function setup() {
  //https://dev.to/shubhambattoo/uploading-files-to-mongodb-with-gridfs-and-multer-using-nodejs-5aed
  //connect with the DB
  const client = await clientPromise;
  const database = client.db('test');
  const bucket = new database.GridFSBucket(database, {
    bucketName: "files"
  });
  //TODO
  //Create get and post handles in the router
  //add the bucket to the db creation to make it available
  //pipe the file from the device to the db
  //check if a new file is added and upload it to the db
}
setup()
// Storage
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo); 99


      });
    });
  }
});

const upload = multer({
  storage
});

export function getFiles(req, res) {
  if (!storage) {
    console.log("some error occured, check connection to db");
    res.send("some error occured, check connection to db");
    process.exit(0);
  }
  storage.find().toArray((err: Error, files: any) => {
    // check if files
    if (!files || files.length === 0) {
      return res.render("index", {
        files: false
      });
    } else {
      const f = files
        .map(file => {
          if (
            file.contentType === "image/png" ||
            file.contentType === "image/jpeg"
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
          return file;
        })
        .sort((a, b) => {
          return (
            new Date(b["uploadDate"]).getTime() -
            new Date(a["uploadDate"]).getTime()
          );
        });

      return res.render("index", {
        files: f
      });
    }
  });
};
// files/del/:id
// Delete chunks from the db
export function deletefiles(req: any, res: any) {
  storage.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return res.status(404).json({ err: err.message });
    res.redirect("/");
  });
}
*/