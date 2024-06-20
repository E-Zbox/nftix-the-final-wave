"use client";
import React from "react";
// components
import Navbar from "../components/navbar";
// styles
import { MainApp } from "@/app/styles/App.styles";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainApp>
      <Navbar />
      {children}
    </MainApp>
  );
}
