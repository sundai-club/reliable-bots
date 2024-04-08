import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import UploadFiles from "./_components/UploadFiles";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
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
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Reliable Bots
        </h1>

        <CrudShowcase />
      </div>
    </main>
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
          <p className="truncate text-2xl">Your bot: {latestPost.title}</p>
          <p>Description: {latestPost.description}</p>
          {latestPost.index_id != "" ?(
            <div>
              <UploadFiles index={latestPost.index_id} />
              
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
