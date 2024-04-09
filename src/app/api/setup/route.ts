// copied to src/app/_components/createIndex.ts on github.com:sundai-club/reliable-bots
import { NextResponse } from 'next/server'
import { writeFile } from "fs/promises";
import { PineconeClient } from '@pinecone-database/pinecone'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { put } from '@vercel/blob';
import {
  createPineconeIndex,
  updatePinecone
} from '../../../utils'

// const crypto = require('crypto');
// const indexName = `index-${crypto.randomBytes(4).toString('hex')}`;
// import { indexName } from '../../../config'

export const POST = async (req: any) => {
  const formData = await req.formData();
  console.log(formData)

  const file = formData.get("file");
  const indexName = formData.get("index-name");
  console.log(file)

  const blob = await put(file.name, file, {
    access: 'public',
  });

  console.log(blob)
  
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  //const filename = file.name.replaceAll(" ", "_");
  try {
    /*
    const filePath = path.join(process.cwd(), "temp_assets/" + filename);
    await writeFile(
      filePath,
      buffer,
      { flag: 'w+' }
    );
    */

    // Load Embedding  to Prisma
    const loader = new PDFLoader(blob)

    const docs = await loader.load()
    const vectorDimensions = 1536

    const client = new PineconeClient()
    await client.init({
      apiKey: process.env.PINECONE_API_KEY || '',
      environment: process.env.PINECONE_ENVIRONMENT || ''
    })

    try {
      await createPineconeIndex(client, indexName, vectorDimensions)
      await updatePinecone(client, indexName, docs)
      console.log('pineconeIndexName: ', indexName)
    } catch (err) {
      console.log('error: ', err)
    }
    
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};