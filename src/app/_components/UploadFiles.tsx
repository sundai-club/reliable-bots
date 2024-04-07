"use client"
import React, { useState } from 'react';

type FileWithPreview = File & { preview: string };

const UploadFiles: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesWithPreview = Array.from(event.target.files).map(file => ({
        ...file,
        preview: URL.createObjectURL(file) // Generate a preview URL for each file
      }));
      setFiles(filesWithPreview); // Update the state with the new files
    }
  };

  const handleSubmit = async () => {
    // Here, you would send the files to your API.
    // This is a placeholder function to be replaced with your actual API call logic.
    console.log("Sending files to API", files);
    // Remember to release object URLs to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  };

  return (
    <div>
      {/* Only accept PDF files */}
      <input type="file" onChange={handleFileChange} accept=".pdf" multiple />
      <button onClick={handleSubmit}>Upload Files (PDF)</button>
      {files.map((file, index) => (
        <div key={index}>{file.name}</div>
      ))}
    </div>
  );
};

export default UploadFiles;
