"use client";
import React, { useState } from "react";
import { LoaderPinwheel, PlusIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { api, ENDPOINT } from "@/lib/api";
import { toast } from "sonner";

const WishlistButton = ({ wishlist }) => {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    
    if (!user.isLoggedIn) return <></>;
    
    const addToWishList = async () => {
        try {
            setLoading(true);
           
            
            const res = await api.post(ENDPOINT.addToWishlist, wishlist);
       
            
            if (res.status === 200) {
                toast("Added to wishlist successfully!");
            }
        } catch (err) {
            console.error("Error adding to wishlist:", err); // Debug log
            
            // Show more specific error messages
            if (err.response?.data?.message) {
                toast(`Failed to add to wishlist: ${err.response.data.message}`);
            } else {
                toast("Failed to add to wishlist. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button 
            className={`sm:ml-auto ${loading ? "cursor-not-allowed" : "cursor-pointer"}`} 
            onClick={addToWishList}
            disabled={loading}
        >
            {loading ? <LoaderPinwheel className="w-4 h-4 mr-2 animate-spin" /> : <PlusIcon className="w-4 h-4 mr-2" />}
            <span className="text-blue-400">Add to Watchlist</span>
        </Button>
    );
};

export default WishlistButton;