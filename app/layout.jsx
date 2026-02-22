import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

//components
import Header from "@/components/Header"
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import Footer from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
})


export const metadata = {
  title: {
    default: "Tomas Melesse",
    template: "%s | Tomas Melesse",
  },
  description: "Portfolio of Tomas Melesse",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} antialiased`}>
      <body>
        <Header />
        <StairTransition />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
