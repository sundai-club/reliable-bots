TECO AI: RAG Chatbot Builder
============================

**Part of [Sundai Club](https://sundai.club/)**

Welcome to TECO AI, a no-code tool designed to empower non-technical founders to rapidly prototype and validate startup ideas through contextual AI chatbots. Our RAG (Retrieval-Augmented Generation) Chatbot Builder leverages the power of AI to create contextually intelligent chatbots from documents like handbooks, guides, or course materials. This guide will help you get started with setting up your own AI chatbot.

Getting Started
---------------

### Quick Setup

1.  Sign Up: First, visit our homepage and sign up using Google authentication. This process is secure and ensures that your data remains private.
2.  Upload Your Document: Navigate to the upload section and submit a PDF of your document. Our system will process and index your document using Pinecone, making it ready for retrieval.
3.  Access Your Bot: Once the document is indexed, you can interact with your chatbot through a dedicated link provided by TECO AI.

Features
--------

-   Document Upload: Upload PDF documents that your chatbot will use as a knowledge base.
-   No-code Interface: Easy-to-use, drag-and-drop interface with no coding required.
-   Real-time Interaction: Engage with your chatbot in real-time to validate your business ideas.
-   Secure Authentication: Integrated Google sign-in for a secure and straightforward login process.

How It Works
------------

TECO AI utilizes a combination of T3, Langchain, and Pinecone to provide a seamless chatbot building experience:

-   T3 Framework: Utilizes TypeScript, Next.js, and Tailwind CSS for a robust and scalable application structure.
-   Langchain for RAG: Implements retrieval-augmented generation to fetch relevant information from the indexed documents in response to user queries.
-   Pinecone Integration: Manages the document indexing and retrieval processes, ensuring fast and accurate responses.

Example Usage
-------------

plaintext

Copy code

`User: How can I improve customer satisfaction?
Bot: Based on your handbook section about customer feedback, consider implementing a real-time feedback loop.`

Customizing Your Chatbot
------------------------

You can customize your chatbot by uploading different documents, each tailored to specific aspects of your business. This allows you to test various scenarios and gather diverse insights.

Challenges & Learnings
----------------------

-   Authentication Integration: Setting up Google authentication with NextAuth required updates to our database schema to accommodate longer token strings.
-   Document Loading: Transitioning from PDFLoader to WebPDFLoader was necessary to handle documents hosted externally, such as on AWS S3.

Useful Resources & Code Examples
--------------------------------

For those building similar systems or needing specific implementation details, here are some direct links to code examples and commits in our GitHub repository that you might find useful:

### Loading Individual Bots by ID

To see how individual bots are loaded by ID within our system, you can view the implementation in the following file:

-   [Load Bot by ID](https://github.com/sundai-club/reliable-bots/blob/main/src/app/%5Btemplate_slug%5D/%5Bbot_id%5D/page.tsx)

### Handling PDF Uploads

For handling PDF uploads using the Langchain JavaScript library, which may not be immediately obvious from the documentation, refer to this example:

-   [PDF Upload Example](https://github.com/sundai-club/reliable-bots/blob/main/src/app/api/setup/route.ts)

### Updates to Authentication System

Understanding changes to the authentication system, especially related to Google Authentication, can be complex. Here are the commits showing how we updated our database and authentication setup:

-   [Update Database for Google Authentication](https://github.com/sundai-club/reliable-bots/commit/38e251475f0c07ad97608b0b838cd5d64b672df9)
-   [Initial Update from Discord to Google Auth (pre-fix)](https://github.com/sundai-club/reliable-bots/commit/c87fdb95ca7098645b09b13927a8d7dd7be206e6)

These links should help you navigate some of the more technical aspects of our setup and provide insights into the adjustments we made to optimize our chatbot system.


