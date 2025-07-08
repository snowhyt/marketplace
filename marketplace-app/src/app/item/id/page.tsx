// app/item/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ItemPage() {
  return (
    <main className="p-6 grid grid-cols-[1fr_300px] gap-6">
      {/* Left: Image */}
      <section>
        <div className="bg-blue-200 w-full h-[500px] rounded-md" />
      </section>

      {/* Right: Info + Message */}
      <aside className="space-y-4">
        <div>
          <h1 className="text-lg font-bold">Bike 24 inch</h1>
          <div className="text-xl font-semibold">$99</div>
        </div>

        <div className="text-sm text-gray-500">
          Listed 1 hour ago<br />
          in Palo Alto, CA
        </div>

        <div>
          <div className="font-semibold">Seller Information</div>
          <div>Wei Gu</div>
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 text-sm">Send seller a message</label>
          <Textarea id="message" defaultValue="I want to buy your bike!" className="mb-2" />
          <Button className="w-full">Send</Button>
        </div>
      </aside>
    </main>
  );
}
