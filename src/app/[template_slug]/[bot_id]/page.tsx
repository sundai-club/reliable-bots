import { headers } from "next/headers";
import Chat from "~/app/_components/Chat";
import { api } from "~/trpc/server";

export default async function ChatBot() {
  const headersList = headers();
  const referer = headersList.get("referer");
  let botIdNum;


  const url = new URL(referer!);
  const pathname = url.pathname;
  const matches = pathname.match(/\/bots\/(\d+)/);
  if (matches && matches[1]) {
    botIdNum = parseInt(matches[1], 10);
  }
  


  const bot = await api.post.getBotById({ id: botIdNum! });
  console.log(bot);
  

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      <Chat bot={bot} />
    </main>
  );
}