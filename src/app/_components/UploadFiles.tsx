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
  
      // Create a FileReader to read the file
      const reader = new FileReader();
  
      // Define what happens on file read completion
      reader.onload = function(loadEvent) {
        const base64data = loadEvent.target?.result;
  
        // Here `base64data` is your file in base64 format. You can now use this string for your preview or send it to your backend.
        // Depending on your requirements, you might directly set this as a preview or additionally store it to send it to the backend.
  
        // Setting the file with base64 preview
        const fileWithPreview = {
          ...selectedFile,
          preview: base64data // This is now a base64 string of your file
        };
        setFile(fileWithPreview);
      };
  
      // Read the file as a Data URL (base64)
      reader.readAsDataURL(selectedFile);
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
