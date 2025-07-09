// src/components/navigation-bar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavigationBar() {
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow">
      <Link href="/" className="text-xl font-semibold">Marketplace</Link>
      <Link href="/create">
        <Button variant="secondary">+ Create Listing</Button>
      </Link>
    </nav>
  );
}
