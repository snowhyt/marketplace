"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ItemDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      const { data, error } = await supabase.from("listings").select("*").eq("id", id).single();
      if (data) setListing(data);
    };
    if (id) fetchItem();
  }, [id]);

  const handleSendMessage = async () => {
    const { error } = await supabase.from("messages").insert({
      listing_id: listing.id,
      buyer_email: "buyer@example.com", // You can replace this with real user input or auth
      message,
    });

    if (!error) {
      alert("Message sent!");
      setMessage("");
    }
  };

  if (!listing) return <div className="p-6">Loading...</div>;

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 h-full">
      {/* Image Section */}
      <section>
        <div  className="w-full h-[500px] object-cover rounded-md flex justify-center  items-start">
        <img
          src={listing.image_url}
          alt={listing.title}
          className="flex w-100 h-auto"
        />
        </div>
        <hr></hr>
        <div className="" >
        <h1 className="text-3xl font-bold mt-4">{listing.title}</h1>
        <p className="text-xl text-gray-700 mt-2">₱{listing.price}</p>
        <p className="mt-4 text-gray-600">{listing.description}</p>
        <p className="text-sm text-gray-500 mt-2">Location: {listing.location}</p>
      
      </div></section>

      {/* Message Seller */}
      <aside className="space-y-4 border p-4 rounded-md shadow-sm ">
        <div>
          <h2 className="text-lg font-semibold">Contact Seller</h2>
          <p className="text-sm text-gray-600">{listing.email}</p>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Message</label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button className="mt-10 w-full" onClick={handleSendMessage}>Send Message</Button>
        </div>
      </aside>
    </main>
  );
}
