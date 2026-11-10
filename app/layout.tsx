import type { Metadata } from "next";
import "../styles.css";

export const metadata: Metadata = {
  title: "Promise Wesley Initiative — Grow Forward",
  description:
    "Promise Wesley Initiative helps young people grow forward with purpose, skills, support, and opportunity.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body data-stage="0">{children}</body>
    </html>
  );
}
