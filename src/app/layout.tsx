import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "mytoolpocket.com - Free Browser Tools in Your Pocket",
  description: "Fast, secure, and free online utilities. Text tools, developer utilities, calculators, converters, SEO tools, and productivity helpers.",
};

const extensionScrubberScript = `
(function() {
  try {
    var observer = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'attributes') {
          var attr = m.attributeName;
          if (attr && m.target && m.target.hasAttribute && m.target.hasAttribute(attr)) {
            if (attr === 'bis_skin_checked' || attr === 'bis_register' || attr.indexOf('__processed_') === 0 || attr === 'fdprocessedid') {
              m.target.removeAttribute(attr);
            }
          }
        }
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      subtree: true,
      attributeFilter: ['bis_skin_checked', 'bis_register', 'fdprocessedid']
    });
    setTimeout(function() {
      try { observer.disconnect(); } catch (err) {}
    }, 1200);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: extensionScrubberScript,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-[#f3eee3] text-[#111111]">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
