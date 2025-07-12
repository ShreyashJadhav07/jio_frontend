"use client";

import { useState, useEffect } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { api, ENDPOINT } from '@/lib/api';
import { cn } from '@/lib/utils';
import { FolderLockIcon, Trash2, Play } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

function WatchList() {
    const userData = useSelector((state) => state.user);
    const [wishlistData, setWishlistData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            setError(null);
          
            
            const res = await api.get(ENDPOINT.getWishlist);
            console.log("Wishlist response:", res.data);
            
            setWishlistData(res.data.data || []);
        } catch (error) {
            console.error("Wishlist fetch error:", error);
            setError(error.response?.data?.message || "Failed to load wishlist");
            setWishlistData([]);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        if (userData.isLoggedIn) {
            fetchWishlist();
        }
    }, [userData.isLoggedIn]);

   
    if (!userData.isLoggedIn) {
        return (
            <div className="mt-[80px] p-4">
                <div className="flex flex-col items-center justify-center h-[80vh] w-full gap-4">
                    <FolderLockIcon
                        className="w-32 h-32 text-slate-400"
                        strokeWidth={1.2}
                    />
                    <p className="text-base text-slate-400">
                        Login to see your watchlist
                    </p>
                    <Link 
                        href={"/login"} 
                        className={cn(buttonVariants(), "rounded-full px-6 mt-4")}
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-[80px] p-4 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">My Watchlist</h1>
                <p className="text-slate-400">
                    {wishlistData.length} {wishlistData.length === 1 ? 'item' : 'items'} in your watchlist
                </p>
            </div>

          
            {loading && (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            )}

         
            {error && (
                <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
                    <p className="text-red-400">Error: {error}</p>
                    <button 
                        onClick={fetchWishlist}
                        className="mt-2 text-red-300 hover:text-red-100 underline"
                    >
                        Try again
                    </button>
                </div>
            )}

         
            {!loading && !error && wishlistData.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <FolderLockIcon className="w-16 h-16 text-slate-400 mb-4" strokeWidth={1.2} />
                    <h3 className="text-xl font-semibold text-white mb-2">Your watchlist is empty</h3>
                    <p className="text-slate-400 mb-4">Start adding movies and TV shows to your watchlist</p>
                    <Link 
                        href="/" 
                        className={cn(buttonVariants(), "rounded-full px-6")}
                    >
                        Browse Content
                    </Link>
                </div>
            )}

            {!loading && !error && wishlistData.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {wishlistData.map((item) => (
                        <div 
                            key={item._id} 
                            className="group relative bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                           
                            <div className="aspect-[2/3] relative">
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = '/placeholder-poster.jpg'; 
                                    }}
                                />
                                
                             
                          
                            </div>

                            
                            <div className="p-3">
                                <h3 className="text-sm font-medium text-white truncate group-hover:text-gray-300 transition-colors">
                                    {item.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WatchList;