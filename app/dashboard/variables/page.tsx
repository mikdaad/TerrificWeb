"use client";

import { updatediscount,updatevariables } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/lib/uplaodthing";
import { discountschema,variablesschema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function BannerRoute() {
  const [image, setImages] = useState<string | undefined>(undefined);
  const [lastResult, action] = useFormState(updatediscount, undefined);
  const [lastResult2, action2] = useFormState(updatevariables, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: discountschema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [form2, fields2] = useForm({
    lastResult:lastResult2,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: variablesschema  });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div>
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
    <div className="flex items-center gap-x-4">
      <Button variant="outline" size="icon" asChild>
        <Link href="/dashboard/products">
          <ChevronLeft className="w-4 h-4" />
        </Link>
      </Button>
      <h1 className="text-xl font-semibold tracking-tight">Discount update</h1>
    </div>

    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Banner Details</CardTitle>
        <CardDescription>Create your banner right here</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-3">
            <Label>update discount here</Label>
            <Input
              name={fields.discount.name}
              key={fields.discount.key}
              defaultValue={fields.discount.initialValue}
              type="number"
              placeholder="update here"
            />
            <p className="text-red-500">{fields.discount.errors}</p>
          </div>

          <div className="flex flex-col gap-3">
            <Label>category</Label>
            <Select
              key="category"
              name="category"
              defaultValue="category"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
            
          </div>

          <div className="flex flex-col gap-3">
            <Label>Gender</Label>
            <Select
              key="gender"
              name="gender"
              defaultValue="gender"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="Men">Men</SelectItem>
                <SelectItem value="Women">Women</SelectItem>
                <SelectItem value="Kids">Kids</SelectItem>
                <SelectItem value="Unisex">Unisex</SelectItem>
              </SelectContent>
            </Select>
            
          </div>

        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton text="Create Banner" />
      </CardFooter>
    </Card>
  </form>
   <form id={form2.id} onSubmit={form2.onSubmit} action={action2}>
      <div className="flex items-center gap-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Discount update</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>variable Details</CardTitle>
          <CardDescription>update your variables right here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>update day deal remaining time here</Label>
              <Input
                name={fields2.daytime.name}
                key={fields2.daytime.key}
                defaultValue={fields2.daytime.initialValue}
                type="number"
                placeholder="update here"
              />
              <p className="text-red-500">{fields2.daytime.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>update lastdate  here</Label>
              <Input
                name={fields2.lastdate.name}
                key={fields2.lastdate.key}
                defaultValue={fields2.lastdate.initialValue}
                type="text"
                placeholder="update here"
              />
              <p className="text-red-500">{fields2.lastdate.errors}</p>
            </div>

          
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="update lastdate" />
        </CardFooter>
      </Card>
    </form>
    </div>
  );
}
