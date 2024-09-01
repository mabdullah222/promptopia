import { Inter } from "next/font/google";
import "../styles/globals.css";
import NavBar from "@components/navbar";
import Provider from "@components/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI prompts",
  description: "Discover and share AI prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900`}>
        <Provider>
        <NavBar></NavBar>
          {children}
        
        </Provider>
        
      </body>
    </html>
  );
}
