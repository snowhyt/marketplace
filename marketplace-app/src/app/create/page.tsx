"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import NavigationBar from "@/components/navbar";

const categories = [
  "Vehicles", "Property Rentals", "Apparel", "Classifieds", "Electronics",
  "Entertainment", "Home Goods", "Toys & Games", "Pet Supplies", "Free Stuff"
];

export default function CreateListingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    email: "",
    category: "",
    location: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.price || !form.email || !form.category) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isNaN(Number(form.price))) {
      alert("Price must be a number.");
      return;
    }

    setUploading(true);
    let image_url = "";

    if (imageFile) {
      const filename = `${uuidv4()}-${imageFile.name}`;
      const { data, error } = await supabase.storage
        .from("listing-images")
        .upload(filename, imageFile);

      if (error) {
        alert("Image upload failed.");
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("listing-images")
        .getPublicUrl(filename);

      image_url = urlData.publicUrl;
    }

    const { data, error } = await supabase.from("listings").insert([{ ...form, image_url }]).select();

    setUploading(false);
    if (!error && data && data[0]) {
      alert("Listing created!");
      router.push(`/item/${data[0].id}`);
    } else {
      console.error("Insert error:", error);
      alert("Error creating listing.");
    }
  };

  return (
    <>
      <NavigationBar />
      <main className="h-screen bg-slate-100">
 
      <div className="max-w-2xl mx-auto p-6 mt-5">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-2">Create a New Listing</h1>

            <div className="space-y-2">
              <Label>Photo</Label>
              <Input type="file" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="w-full rounded-md mt-2" />}
            </div>

            <div className="space-y-2">
              <Label>Title *</Label>
              <Input name="title" value={form.title} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea name="description" value={form.description} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price *</Label>
                <Input name="price" type="number" value={form.price} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input name="location" value={form.location} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-sm"
                >
                  <option value="">Select</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button className="w-full mt-4" onClick={handleSubmit} disabled={uploading}>
              {uploading ? "Submitting..." : "Create Listing"}
            </Button>
          </CardContent>
        </Card>
       </div>
      </main>
    </>
  );
}
