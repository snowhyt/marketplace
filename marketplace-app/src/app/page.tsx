

import { Suspense } from "react";
import MarketplacePage from "@/components/MarketplacePage";
import NavigationBar from "@/components/navbar";

export default function Home() {
  return (
    <>
     <NavigationBar />
    <Suspense fallback={<div className="p-4">Loading listings...</div>}>
      <MarketplacePage />
    </Suspense>
    </>
  );
}
