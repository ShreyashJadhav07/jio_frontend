'use client';
import { api, ENDPOINT, getStreamingVideoThumbnail } from "@/lib/api";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { PlayCircleIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function JioPlusPage() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await api.get(ENDPOINT.fetchAllStreamingVideos);
                setVideos(response.data?.data || []);
            } catch (error) {
                console.error('Failed to fetch streaming videos:', error);
                setError('Unable to load videos at the moment. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <main className="h-screen mt-20 p-8">
                <h1 className="text-2xl font-medium mb-6">Jio+ Premium Videos</h1>
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Loading videos...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="h-screen mt-20 p-8">
                <h1 className="text-2xl font-medium mb-6">Jio+ Premium Videos</h1>
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">{error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="h-screen mt-20 p-8">
            <h1 className="text-2xl font-medium mb-6">Jio+ Premium Videos</h1>
            <ul
                className={cn("flex gap-4 w-full overflow-scroll scrollbar-hide p-4")}
            >
                {videos?.map((video, index) => (
                    <Link
                        key={index}
                        href={`jio+/watch?id=${video.id}`}
                        className="relative flex items-center justify-center"
                    >
                        <Image
                            src={getStreamingVideoThumbnail(video.id)}
                            alt=""
                            width={200}
                            height={300}
                            className="min-w-[200px] h-[300px] rounded-lg object-cover"
                            quality={30}
                        />
                        <PlayCircleIcon className="absolute" />
                    </Link>
                ))}
            </ul>
        </main>
    );
}