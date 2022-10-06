import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import Image from 'next/image'
import FileUpload from "react-material-file-upload";
export default function UploadFile() {
  const [files, setFiles] = useState<File[]>([]);
  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("sampleFile", files[0]);
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      body
    });
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
