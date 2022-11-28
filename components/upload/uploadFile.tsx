import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import Image from 'next/image'
import FileUpload from "react-material-file-upload";
/**/
/*
components::UploadFile() components::UploadFile()

NAME

        UploadFile()
          - Functional component to upload a file.

SYNOPSIS

        UploadFile()

DESCRIPTION

        This function will use a state constant files of types File[] to
        store the files that the user is trying to upload.
        They are appended to the body of the request to the backend that stores
        it in a bucket and then transfer it to the remote machine.

        The Function genereates html renders it and attaches a
        function uploadToServer on the client to pass it to the server
        to process and upload or fail
        and be empty insted.

RETURNS

        Returns markup of precompiled HTML elements and the bootstrapped
        logic associated with the element.
*/
/**/
export default function UploadFile() {
  const [files, setFiles] = useState<File[]>([]);
  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("sampleFile", files[0]);
    //change this in prod
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      body
    });
    //process response
  };

  return (
    <div>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: 'lightgray',
        }}>
        <h1>React Material File Uplpad</h1>
        <FileUpload value={files} onChange={setFiles} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </Paper>
    </div>
  )
}
