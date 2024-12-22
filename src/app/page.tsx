import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <main className="text-center">
        <h1>Home page</h1>
        <Link href="/map/new"><h3>Create</h3></Link>
    </main>
  )
}
