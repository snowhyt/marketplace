// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { JSX } from "react";
import NavigationBar from "@/components/navbar";
import{Button} from '@/components/ui/button'
import {
  Car,
  Home,
  Shirt,
  Smartphone,
  Gamepad2,
  Leaf,
  PawPrint,
  PackageSearch,
  Store,
} from "lucide-react";

const categories = [
  "Vehicles", "Property Rentals", "Apparel", "Electronics", "Entertainment",
  "Home Goods", "Toys & Games", "Free Stuff"
];


const categoryIcons: Record<string, JSX.Element> = {
  Vehicles: <Car size={16} />, "Property Rentals": <Home size={16} />, Apparel: <Shirt size={16} />,
  Electronics: <Smartphone size={16} />, Entertainment: <Gamepad2 size={16} />,
  "Free Stuff": <PackageSearch size={16} />, "Home Goods": <Store size={16} />,
  "Toys & Games": <Gamepad2 size={16} />, "Pet Supplies": <PawPrint size={16} />,
  "Garden & Outdoor": <Leaf size={16} />,
};

export default function MarketplacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<any[]>([]);

  const search = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";

  useEffect(() => {
  const fetchListings = async () => {
    const { data, error } = await supabase.from("listings").select("*").order("created_at", { ascending: false });

    console.log("LISTINGS:", data);
    console.log("ERROR:", error);

    if (data) setListings(data);
  };

  fetchListings();
}, []);




  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/?${params.toString()}`);
  };

  const filtered = listings.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  return (
    <>
    <NavigationBar/>
    <main className="p-4 grid grid-cols-[220px_1fr] gap-4">
      {/* Sidebar */}
      <aside className="space-y-4">

        <div>
          <h2 className="text-lg font-semibold mb-5">Categories</h2>
          <ul className=" flex flex-col space-y-1 gap-y-5">
            {categories.map((cat, i) => (
              <li
                key={i}
                onClick={() => updateQuery("category", cat)}
                className={`flex items-center gap-2 cursor-pointer ${selectedCategory === cat ? "font-bold text-blue-600" : ""}`}
              >
                {categoryIcons[cat]} {cat}
              </li>
            ))}
            <li onClick={() => updateQuery("category", "")} className="text-sm text-gray-500 cursor-pointer mt-2">Clear filter</li>
          </ul>
        </div>
      </aside>

      {/* Main */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Today's picks</h2>
 

          <Input
            placeholder="Search listings..."
            value={search}
            onChange={(e) => updateQuery("search", e.target.value)}
            className="w-64"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filtered.map((post) => (
            <Link href={`/item/${post.id}`} key={post.id}>
              <Card className="hover:shadow-md cursor-pointer">
                <img src={post.image_url || "image-placeholder.jpg"} className="h-40 w-full object-cover rounded-t-md" />
                <CardContent className="p-2 space-y-1 text-sm">
                  <div className="font-semibold text-lg">P{post.price}.00</div>
                  <div>{post.title}</div>
                  <div className="text-gray-500">{post.location || post.category}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}
