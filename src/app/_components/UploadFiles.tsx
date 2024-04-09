/* eslint-disable @typescript-eslint/prefer-optional-chain */
"use client"
import React, { useState } from 'react';

type FileWithPreview = File & { preview: string };

type UploadFilesProps = {
  index: string; 
};

const UploadFiles: React.FC<UploadFilesProps> = ({ index }) => {
  // const [file, setFile] = useState<FileWithPreview | null>(null);
  const [file, setFile] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const fileWithPreview: FileWithPreview = {
        ...selectedFile,
        preview: URL.createObjectURL(selectedFile) // Generate a preview URL for the file
      };
      setFile(fileWithPreview); 
    }
  };

  const handleSubmit = async () => {

    if (file) {
      console.log("Sending file to API", file.preview);
      const formData = new FormData();
      formData.append('file', file.preview);
      formData.append('index-name', index);

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
    // index for pinecone is passed in as 'index'
    <div>
      {/* Only accept PDF files and do not allow multiple files to be selected */}
      <input type="file" id="" onChange={handleFileChange} accept=".pdf" />
      <button className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20' onClick={handleSubmit}>Upload File</button>
      {file && <div>{file.name}</div>}
    </div>
  );
};

export default UploadFiles;
