"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import NavigationBar from "@/components/navbar";

export default function ItemDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setListing(data);
    };

    if (id) fetchItem();
  }, [id]);

  const handleSendMessage = async () => {
    if (!buyerEmail || !message) {
      alert("Please fill in both email and message.");
      return;
    }

    const { error } = await supabase.from("messages").insert({
      listing_id: listing.id,
      buyer_email: buyerEmail,
      message,
    });

    if (!error) {
      alert("Message sent!");
      setMessage("");
      setBuyerEmail("");
    } else {
      console.error("Send error:", error);
      alert("Failed to send message.");
    }
  };

  if (!listing) return <div className="p-6">Loading...</div>;

  return (
    <>
      <NavigationBar />
      <main className="p-6 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 h-full">
        {/* Image Section */}
        <section>
          <div className="w-full aspect-[4/3] bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
            <img
              src={listing.image_url}
              alt={listing.title}
              className="w-full h-full object-contain"
            />
          </div>

          <hr className="my-6" />

          <div>
            <h1 className="text-3xl font-bold">{listing.title}</h1>
            <p className="text-xl text-gray-700 mt-2">₱{listing.price}</p>
            <p className="mt-4 text-gray-600">{listing.description}</p>
            <p className="text-sm text-gray-500 mt-2">Location: {listing.location}</p>
          </div>
        </section>

        {/* Message Seller */}
        <aside className="space-y-4 border p-4 rounded-md shadow-sm bg-white">
          <div>
            <h2 className="text-lg font-semibold">Contact Seller</h2>
            <p className="text-sm text-gray-600">{listing.email}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Your Email</label>
            <Input
              type="email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              placeholder="your@email.com"
            />

            <label className="text-sm font-medium block">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />

            <Button className="w-full mt-4" onClick={handleSendMessage}>
              Send Message
            </Button>
          </div>
        </aside>
      </main>
    </>
  );
}
