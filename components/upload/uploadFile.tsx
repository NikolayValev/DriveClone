import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import Image from 'next/image'
import FileUpload from "react-material-file-upload";
export default function UploadFile() {
  const [files, setFiles] = useState<File[]>([]);
  const uploadToServer = async (event) => {
    const body = new FormData();
    //body.append("file", image);
    const response = await fetch("/api/file", {
      method: "POST",
      body
    });
  };

  return (
    <div>
      <h1>React Material File Uplpad</h1>
      <FileUpload value={files} onChange={setFiles} />
      <button
        className="btn btn-primary"
        type="submit"
        onClick={uploadToServer}
      >
        Send to server
      </button>
    </div>
  )
}
