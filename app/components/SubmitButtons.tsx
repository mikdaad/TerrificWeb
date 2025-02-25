"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag,Heart } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


interface buttonProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButton({ text, variant }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingBagButton({ onAddToCart }: { onAddToCart: () => Promise<{ error?: string; success?: boolean; message?: string } | undefined> }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await onAddToCart();

      if (!response) {
        toast.success(response|| "Added to Cart!");
      } else if (response.error) {
        toast.success(response.message || "Added to Cart!");
      } else if (response.success) {
        toast.success(response.message || "Added to Cart!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div>
      <Button size="lg" className="w-full mt-5" onClick={handleClick} disabled={loading} type="button">
        {loading ? (
          <>
            <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Please Wait
          </>
        ) : (
          <>
            <ShoppingBag className="mr-4 h-5 w-5" /> Add to Cart
          </>
        )}
      </Button>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
    </div>
  );
}


export function WishlistButton({ onAddToWishlist }: { onAddToWishlist: () => Promise<{ error?: string; success?: boolean; message?: string }> }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setErrorMessage(null); // Reset error state

    try {
      const response = await onAddToWishlist(); // Call the function

      if (response.error) {
        setErrorMessage(response.error);
        toast.error(response.error); // Show error toast
      } else if (response.success) {
        toast.success(response.message || "Added to Wishlist!"); // Show success toast
      }
    } catch (error) {
      setErrorMessage("Something went wrong!");
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div>
      <Button
        size="lg"
        className="w-full mt-5"
        onClick={handleClick}
        disabled={loading}
        type="button" // Prevents form submission
      >
        {loading ? (
          <>
            <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Please Wait
          </>
        ) : (
          <>
            <Heart className="mr-4 h-5 w-5" /> Add to Wishlist
          </>
        )}
      </Button>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

      {/* Toast container to display notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
    </div>
  );
}


export function DeleteItem() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button disabled className="font-medium text-primary text-end">
          Removing...
        </button>
      ) : (
        <button type="submit" className="font-medium text-primary text-end">
          Delete
        </button>
      )}
    </>
  );
}



export function MovetoCart() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button disabled className="font-medium text-primary text-end">
          moving...
        </button>
      ) : (
        <button type="submit" className="font-medium text-primary text-end ">
          Move to Cart
        </button>
      )}
    </>
  );
}


export function ChceckoutButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button type="submit" size="lg" className="w-full mt-5">
          Checkout
        </Button>
      )}
    </>
  );
}



