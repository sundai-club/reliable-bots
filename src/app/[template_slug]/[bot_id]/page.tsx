import { headers } from "next/headers";
import Chat from "~/app/_components/Chat";
import { api } from "~/trpc/server";


export default async function ChatBot({ params }: { params: any }) {
  //const headersList = headers();
  //const referer = headersList.get("referer");
  //let botIdNum;

  // THE ISSUE HERE: this isn't getting the URL in production
  /*
  if (referer) {
    const url = new URL(referer);
    const pathname = url.pathname;
    const matches = pathname.match(/\/bots\/(\d+)/);
    if (matches && matches[1]) {
      botIdNum = parseInt(matches[1], 10);
    }
  }
  */
  console.log(params.bot_id)

  const botIdNum = parseInt(params.bot_id)

  let bot = null;
  if (botIdNum !== undefined) {
    bot = await api.post.getBotById({ id: botIdNum });
    console.log(bot);
  }

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      <Chat bot={bot} />
    </main>
  );
}