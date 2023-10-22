import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
 });

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <main className={nunito.className}>{children}</main>
      </body>
    </html>
  );
}
