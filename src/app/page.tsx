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
      <header className="bg-purple-900 text-white p-6 text-center">
          <h1 className="text-3xl font-bold">TECO</h1>
          <p className="text-xl mt-2">Validate a Chatbot Concept in 3 clicks - No Code!</p>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-top bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in & Sign up"}
            </Link>
          </div>
        </div>

        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">        
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-[3rem]">
            Custom Chatbots:
          </h1>

          <CrudShowcase />
        </div>
      </main>
    </div>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <div>
          <p className="truncate text-2xl">Title: {latestPost.title}</p>
          <p>Description: {latestPost.description}</p>
          {latestPost.index_id != "" ?(
            <div>
              <UploadFiles />
            </div>
          ) : (<p><em>PDF previously uploaded</em></p>)}
          <p><Link href={`/bots/${latestPost.id}`}><u>Open Shareable Chatbot Interface</u></Link></p>
        </div>
      ) : (
        <p>You have no bots created.</p>
      )}
    </div>
  );
}
