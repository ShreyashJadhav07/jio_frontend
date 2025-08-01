import { api, ENDPOINT } from "@/lib/api";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PlayCircleIcon } from "lucide-react";

export default async function JioPlusPage() {
   const videos = (await api.get(ENDPOINT.fetchAllStreamingVideos)).data?.data;

   return (
       <main className="h-screen mt-20 p-8">
           <h1 className="text-2xl font-medium mb-6">Jio+ Premium Videos</h1>
           <ul
               className={cn("flex gap-4 w-full overflow-scroll scrollbar-hide p-4")}
           >
               {videos?.map((video, index) => (
                   <Link
                       key={index}
                       href={`/jio+/watch?id=${video.id}`}
                       className="relative flex items-center justify-center"
                   >
                       <div className="min-w-[200px] h-[300px] rounded-lg bg-gray-800 flex flex-col items-center justify-center text-white">
                           <PlayCircleIcon className="w-16 h-16 mb-4" />
                           <p className="text-center px-4">{video.name || video.id}</p>
                       </div>
                   </Link>
               ))}
           </ul>
       </main>
   );
}