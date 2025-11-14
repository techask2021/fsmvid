"use client"
nexport const runtime = "edge";

import { NextStudio } from "next-sanity/studio"
import config from "@/cms/sanity/config"

export default function StudioPage() {
  return <NextStudio config={config} />
}
