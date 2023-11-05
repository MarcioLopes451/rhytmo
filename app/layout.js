import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
 });

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <main className={nunito.className} style={{ overflow: "hidden", height: "100%" }}>{children}</main>
      </body>
    </html>
  );
}
