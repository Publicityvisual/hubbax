"use client"

import "./globals.css" // Importación CRÍTICA del diseño
import { useEffect } from "react"
import { Toaster } from "@/components/ui/sonner"
import { APP_VERSION } from "@/lib/version"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const currentVersion = localStorage.getItem("hubbax_version")
    if (currentVersion !== APP_VERSION) {
      localStorage.setItem("hubbax_version", APP_VERSION)
      window.location.reload()
    }
  }, [])

  return (
    <html lang="es">
      <body className="antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
