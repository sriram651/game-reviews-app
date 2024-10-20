import localFont from "next/font/local";
import "@/styles/globals.scss";
import Provider from "@/utils/Provider";
import AuthLayout from "@/components/auth/AuthLayout";

const geistSans = localFont({
  src: "./../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Game Reviews",
  description: "Game reviews and ratings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <AuthLayout>
            {children}
          </AuthLayout>
        </Provider>
      </body>
    </html>
  );
}
