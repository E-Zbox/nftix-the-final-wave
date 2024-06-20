import type { Metadata } from "next";
import React from "react";
// components
import Layout from "./components/Layout";

export const metadata: Metadata = {
  title: "Tickets with MEGO | Graph Rising The Final Wave",
  description: "Where tickets meets the blockchain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
