

import { Suspense } from "react";
import MarketplacePage from "@/components/MarketplacePage";

export default function Home() {
  return (
    <>
    <Suspense fallback={<div className="p-4">Loading listings...</div>}>
      <MarketplacePage />
    </Suspense>
    </>
  );
}
