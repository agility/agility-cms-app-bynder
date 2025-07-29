import "./globals.css";
import "@agility/plenum-ui/lib/tailwind.css";
import classNames from "classnames";
import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata = {
  title: "Agility CMS Bynder App",
  description: "Connect your Bynder assets with Agility",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={classNames(mulish.className, "h-full text-black")}>
        {children}
      </body>
    </html>
  );
}
