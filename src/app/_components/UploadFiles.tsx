"use client"
import React, { useState } from 'react';

type FileWithPreview = File & { preview: string };

type UploadFilesProps = {
  index: string; // Assuming index is a string based on your usage
};

const UploadFiles: React.FC<UploadFilesProps> = ({ index }) => {
  // const [file, setFile] = useState<FileWithPreview | null>(null);
  const [file, setFile] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      // const fileWithPreview: FileWithPreview = {
      //   ...selectedFile,
      //   preview: URL.createObjectURL(selectedFile) // Generate a preview URL for the file
      // };
      setFile(selectedFile); // Update the state with the new file
    }
  };

  const handleSubmit = async () => {

    // const fileInput = document.getElementById("fileInput"); // Replace with your HTML element ID
    // const file = fileInput.files[0];

    if (file) {
      // console.log("Sending file to API", file.preview);

      // Send to pinecone index 
      // const crypto = require('crypto');
      // const indexName = `index-${crypto.randomBytes(4).toString('hex')}`;
      const indexName = 'my-test-pinecone-index2'
      // createIndexAndEmbeddings(indexName,file.preview);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('index-name', indexName);

      // createIndexAndEmbeddings
      const response = await fetch('/api/setup', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        console.log('File uploaded successfully!');
      } else {
        console.log('Error uploading file.');
      }


      // URL.revokeObjectURL(file.preview);
    }
  };

  return (
    <div>
      <h1>id: {index}</h1>
      {/* Only accept PDF files and do not allow multiple files to be selected */}
      <input type="file" id="" onChange={handleFileChange} accept=".pdf" />
      <button onClick={handleSubmit}>Upload File</button>
      {file && <div>{file.name}</div>}
    </div>
  );
};

export default UploadFiles;
