"use client";
import { ColorSchemeScript } from "@mantine/core";
import { useEffect, useState } from "react";

const ClientSideColorSchemeScript = () => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (!render) setRender(true)
  }, [])

  if (!render) return null

  return (
    <ColorSchemeScript />
  )
}
export default ClientSideColorSchemeScript;