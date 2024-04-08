import { NextRequest } from "next/server"
import { headers } from "next/headers"



import Chat from "~/app/_components/Chat";
import MobileSiderbar from "~/app/_components/MobileSidebar";
import Sidebar from "~/app/_components/Sidebar";
import useAnalytics from "~/app/_hooks/useAnalytics";
import { api } from "~/trpc/server";

export default async function ChatBot() {
  const headersList = headers();
  const referer = headersList.get("referer");
  let botIdNum;

  if (referer) {
    const url = new URL(referer);
    const pathname = url.pathname;

    // Extracts the number from the pathname using a regex match
    const matches = pathname.match(/\/bots\/(\d+)/);
    if (matches && matches[1]) { // Check if matches and matches[1] are truthy
      botIdNum = parseInt(matches[1], 10); // The radix 10 is for decimal numbers
    }
  }

  let bot;
  if (botIdNum !== undefined) { // Check if botIdNum is not undefined
    bot = await api.post.getBotById({id: botIdNum});  
    console.log(bot)
  }

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      <Chat/>
    </main>
  );
}
