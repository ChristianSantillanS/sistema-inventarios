"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./store";
import SliderBar from "./components/SliderBar";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Inicializa el estado de modo oscuro desde localStorage
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode.toString());
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
      >
        <Provider store={store}>
          {/* Navbar */}
          <Navbar onToggleDarkMode={toggleDarkMode} />

          <div className="flex flex-1">
            {/* Slider Bar */}
            <SliderBar />

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 dark:text-white p-4">
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
