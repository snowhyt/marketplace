
"use client";

import { Suspense } from "react";
import MarketplacePage from "@/components/MarketplacePage";

export default function Home() {
  return (
    <Suspense>
      <MarketplacePage />
    </Suspense>
  );
}
