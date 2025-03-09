"use client";

import { createProduct } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../../../components/ui/popover";
import {Checkbox } from "../../../components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { useState,FormEvent } from "react";

import Image from "next/image";
import { SubmitButton } from "@/app/components/SubmitButtons";

import { AvatarUploader } from "../../../components/dashboard/imageuploader";

export default function ProductCreateRoute() {
  const [images, setImages] = useState<string[]>([]);
  const [lastResult, action] = useFormState(createProduct, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size) // Remove if already selected
        : [...prevSizes, size] // Add if not selected
    );
  };

  const availableColors = [
    "single color","Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Purple", "Orange",
    "Teal", "Brown", "Gray", "Cyan", "Magenta", "Gold", "Silver", "Maroon", "Olive",
    "Navy", "Lime", "Indigo", "Turquoise", "Beige", "Coral"
  ];
   const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };
  const addCustomColor = () => {
    if (customColor && !selectedColors.includes(customColor)) {
      setSelectedColors([...selectedColors, customColor]);
      setCustomColor(""); // Reset input
    }
  };
  const [customColor, setCustomColor] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);


const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  // ✅ Append sizes & colors as individual values, NOT JSON strings
  selectedSizes.forEach((size) => formData.append("sizes", size));
  selectedColors.forEach((color) => formData.append("colors", color));

  await createProduct(null, formData);
};



  return (
    <form id={form.id} onSubmit={handleSubmit} action={action}>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form you can create your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
                className="w-full"
                placeholder="Product Name"
              />

              <p className="text-red-500">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-lg border"
                      />

                      <button
                        onClick={() => handleDelete(index)}
                        type="button"
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (<div> 

<AvatarUploader
      onUploadSuccess={(url) => {
        console.log("Uploaded URL:", url); // Debugging

        setTimeout(() => {
          setImages((prevImages) => [...prevImages, ...url]);
        }, 20000);

        
      }}
    />
                </div>
                )}

              <p className="text-red-500">{fields.images.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
                placeholder="Write your description right here..."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>original price</Label>
              <Input
                key={fields.originalprice.key}
                name={fields.originalprice.name}
                defaultValue={fields.originalprice.initialValue}
                type="number"
                placeholder="₹550"
              />
              <p className="text-red-500">{fields.originalprice.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>discountedprice</Label>
              <Input
                key={fields.discountprice.key}
                name={fields.discountprice.name}
                defaultValue={fields.discountprice.initialValue}
                type="number"
                placeholder="₹550"
              />
              <p className="text-red-500">{fields.discountprice.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>stars</Label>
              <Input
                key={fields.stars.key}
                name={fields.stars.name}
                defaultValue={fields.stars.initialValue}
                type="number"
                placeholder="5"
              />
              <p className="text-red-500">{fields.stars.errors}</p>
            </div>

           

            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultValue={fields.isFeatured.initialValue}
              />
              <p className="text-red-500">{fields.isFeatured.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>gender</Label>
              <Select
                key={fields.gender.key}
                name={fields.gender.name}
                defaultValue={fields.gender.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Men">Men</SelectItem>
                  <SelectItem value="Women">Women</SelectItem>
                  <SelectItem value="Teens">Teens</SelectItem>
                  <SelectItem value="Kids">Kids</SelectItem>
                  <SelectItem value="Unisex">Unisex</SelectItem>
                  
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.gender.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={fields.category.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status of the product</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={fields.status.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status of product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dealoftheday">Flash Sale</SelectItem>
                  <SelectItem value="NewArrival">Top Selling</SelectItem>
                  <SelectItem value="TrendingProduct">Brand of products</SelectItem>
                  <SelectItem value="TrendingProduct2">Brand of products 2</SelectItem>
                  <SelectItem value="None">None</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>

        {/* Sizes Selection */}
<div className="flex flex-col gap-3">
  <Label>Available Sizes</Label>
  <div className="flex gap-4">
    {["S", "M", "L", "XL", "XXL"].map((size) => (
      <label key={size} className="flex items-center gap-2">
        <Input
          type="checkbox"
          value={size}
          checked={selectedSizes.includes(size)}
          onChange={() => handleSizeChange(size)}
          className="form-checkbox"
        />
        {size}
      </label>
    ))}
  </div>
</div>



{/* Colors Selection */}
<div className="flex flex-col gap-3">
  <Label>Available Colors</Label>
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">
        {selectedColors.length > 0 ? selectedColors.join(", ") : "Select Colors"}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-56 max-h-64 overflow-y-auto">
      {availableColors.map((color) => (
        <div key={color} className="flex items-center gap-2">
         <Checkbox
        name="colors"
        checked={selectedColors.includes(color)}
         onChange={() => toggleColor(color)}
          />


          <span>{color}</span>
        </div>
      ))}
      {/* Custom Color Picker */}
      <div className="mt-2 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Enter custom color"
          name="customColor" // ✅ Corrected: Properly named input field
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
        />
        <Button size="sm" onClick={addCustomColor}>Add</Button>
      </div>
    </PopoverContent>
  </Popover>
</div>


          
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Product" />
        </CardFooter>
      </Card>
    </form>
  );
}
