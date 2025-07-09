import { Suspense } from "react";
import MarketplaceClient from "./MarketplaceClient";
import NavigationBar from "@/components/navbar";

export default function Page() {
  return (
    <>
      <NavigationBar />
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <MarketplaceClient />
      </Suspense>
    </>
  );
}
