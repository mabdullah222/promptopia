import Image from "next/image";
import Feed from "@components/feed";

export default function Home() {
  return (
    <section className="w-full flex-col justify-center items-center bg-slate-900">
        <div className="text-[50px] font-extrabold font-satoshi text-center">
          <span className="text-gray-500">Discover & Share</span>
          <br/>
          <span className="orange_gradient text-center">AI-powered prompts</span>
        </div>
        <p className="text-gray-400 p-10 text-center">
          Promptopia is an open source AI prompting tool for modern world to discover, create and share creative prompts
        </p>
        <Feed></Feed>
        
    </section>
  );
}
