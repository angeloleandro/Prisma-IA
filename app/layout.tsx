// app/layout.tsx

import { Metadata } from "next";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "@/components/ui/Toasts/toaster";
import { PropsWithChildren } from "react";
import { getURL } from "@/utils/helpers";
import { GlobalState } from "@/components/utility/global-state";
import "styles/main.css";

const title = "Your App Title";
const description = "Your App Description";

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-black">
        <GlobalState>
          <Navbar />
          <main
            id="skip"
            className="md:min-h[calc(100dvh-5rem)] min-h-[calc(100dvh-4rem)]"
          >
            {children}
          </main>
          <Footer />
          <Toaster />
        </GlobalState>
      </body>
    </html>
  );
}
