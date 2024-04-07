"use client"

import { useEffect, useState } from "react";
import Chat from "~/app/_components/Chat";
import MobileSiderbar from "~/app/_components/MobileSidebar";
import Sidebar from "~/app/_components/Sidebar";
import useAnalytics from "~/app/_hooks/useAnalytics";

export default function ChatBot() {
  const defaultModel = {
    name: "Your Generic Business Bot",
    id: "generic-3.5-turbo",
    available: true,
  };

  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [model, setModel] = useState(defaultModel);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent("page.view", { page: "bot" });
  }, []);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      {isComponentVisible ? (
        <MobileSiderbar toggleComponentVisibility={toggleComponentVisibility} />
      ) : null}
      <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar />
        </div>
      </div>
      <Chat toggleComponentVisibility={toggleComponentVisibility} selectedModel={model}/>
    </main>
  );
}
