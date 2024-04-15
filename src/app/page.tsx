import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import UploadFiles from "./_components/UploadFiles";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div>
      <header className="bg-purple-900 text-white p-6 flex justify-between items-center">
          <div>
              <h1 className="text-2xl font-bold"><a href="#">TECO</a></h1>
              <p className="mt-2">Validate a Chatbot Concept in 3 clicks - No Code!</p>
          </div>

          <div className="flex space-x-4">
              {session ? (
                  <Link
                      href="/api/auth/signout"
                      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                  >
                      Sign out
                  </Link>
              ) : (
                  <>
                      <Link
                          href="/api/auth/signin"
                          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                      >
                          Sign in
                      </Link>
                      <Link
                          href="/api/auth/signin"
                          className="rounded-full bg-purple-500 text-white px-10 py-3 font-semibold no-underline transition hover:bg-purple-600"
                      >
                          Sign up
                      </Link>
                  </>
              )}
          </div>
      </header>

      <main className="flex min-h-screen flex-col items-center justify-top bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white pt-10">


      {session ? (
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">        
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-[3rem]">
            <span>Your Reliable Bots</span>
          </h1>

          <CrudShowcase />
        </div>

        ): (
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <h1 className="text-3xl font-extrabold">
              AI Chatbot Builder for Non Technical Founders
            </h1>
            <p>Validate your business idea by making your handbooks, guides, and course materials chat with your audience.</p>

            <div className="flex flex-col items-center justify-center gap-4">
                <Link
                  href="/api/auth/signin"
                  className="rounded-full bg-purple-500 px-10 py-3 font-semibold no-underline transition hover:bg-purple-600"
                >
                  Sign up
                </Link>
            </div>
          </div>
        )}


      </main>
    </div>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full p-4 bg-gray-800 shadow-lg rounded-lg">
        {latestPost ? (
            <div className="grid grid-cols-6 gap-1 items-start">
                <div className="col-span-4">
                    <p className="truncate text-2xl font-bold text-white">{latestPost.title}</p>
                    <p className="text-sm text-white">No Documents Uploaded</p>
                    <p className="text-white"><strong>Upload the document you'd like your Chatbot to reference</strong></p>
                    <p className="text-xs text-white">Only upload a PDF. Once it's uploaded, you'll be able to share a chat that only replies with references to the information in that PDF.</p>
                    <p className="text-xs text-white">Once you press "Upload", it will take a few minutes for your chatbot to update. Once it does, you (and anyone you send the link to) will be able to chat with it at the link below</p>
                </div>
                <div className="col-span-2 flex flex-col space-y-2">
                    {latestPost.index_id != "" ? (
                        <div>
                            <UploadFiles index={latestPost.index_id!} />
                        </div>
                    ) : (
                        <p className="text-white"><em>PDF previously uploaded</em></p>
                    )}
                    <p><Link href={`/bots/${latestPost.id}`} className="text-blue-400 underline">Open Shareable Chatbot Interface</Link></p>
                </div>
            </div>
        ) : (
            <p className="text-white">You have no bots created.</p>
        )}
    </div>
  );
}
