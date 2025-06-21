import { redirect } from "next/navigation"

export const metadata = {
  robots: "noindex, noimageindex, noarchive, nosnippet"
}

export default async function RedirectPage() {
  // Replace with your actual biolink URL
  redirect("https://server-roblox.com/games/126884695634066/Grow-a-Garden?privateServerLinkCode=60996196158654546780483711157260)
}
