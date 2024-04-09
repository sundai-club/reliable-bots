import { headers } from "next/headers";
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
    const matches = pathname.match(/\/bots\/(\d+)/);
    if (matches && matches[1]) {
      botIdNum = parseInt(matches[1], 10);
    }
  }

  let bot = null;
  if (botIdNum !== undefined) {
    bot = await api.post.getBotById({ id: botIdNum });
    console.log(bot);
  }

  if (bot === null) {
    // If bot is still null after the await, you can handle the loading state or display an error message
    return <div>Loading...</div>;
  }

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      <Chat bot={bot} />
    </main>
  );
}