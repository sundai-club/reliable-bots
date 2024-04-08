/* eslint-disable @typescript-eslint/prefer-optional-chain */
"use client"
import React, { useState } from 'react';

type FileWithPreview = File & { preview: string };

const UploadFiles: React.FC = () => {
  const [file, setFile] = useState<FileWithPreview | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const fileWithPreview: FileWithPreview = {
        ...selectedFile,
        preview: URL.createObjectURL(selectedFile) // Generate a preview URL for the file
      };
      setFile(fileWithPreview); // Update the state with the new file
    }
  };

  const handleSubmit = async () => {

    if (file) {
      console.log("Sending file to API", file.preview);
      URL.revokeObjectURL(file.preview);
    }
  };

  return (
    <div>
      {/* Only accept PDF files and do not allow multiple files to be selected */}
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20' onClick={handleSubmit}>Upload File</button>
      {file && <div>{file.name}</div>}
    </div>
  );
};

export default UploadFiles;
