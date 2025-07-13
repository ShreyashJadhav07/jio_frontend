// import { api, ENDPOINT, getStreamingVideoThumbnail } from "@/lib/api";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import Image from "next/image";
// import { PlayCircleIcon } from "lucide-react";

// export default async function JioPlusPage() {
//     const videos = (await api.get(ENDPOINT.fetchAllStreamingVideos)).data?.data;

//     return (
//         <main className="h-screen mt-20 p-8">
//             <h1 className="text-2xl font-medium mb-6">Jio+ Premium Videos</h1>
//             <ul
//                 className={cn("flex gap-4 w-full overflow-scroll scrollbar-hide p-4")}
//             >
//                 {videos?.map((video, index) => (
//                     <Link
//                         key={index}
//                         href={`/jio+/watch?id=${video.id}`}
//                         className="relative flex items-center justify-center"
//                     >
//                         <Image
//                             src={getStreamingVideoThumbnail(video.id)}
//                             alt=""
//                             width={200}
//                             height={300}
//                             className="min-w-[200px] h-[300px] rounded-lg object-cover"
//                             quality={30}
//                         />
//                         <PlayCircleIcon className="absolute" />
//                     </Link>
//                 ))}
//             </ul>
//         </main>
//     );
// }

import { cn } from "@/lib/utils";
import Link from "next/link";
import { PlayCircleIcon } from "lucide-react";
import { api } from "@/path/to/your/api";
import { ENDPOINT } from "@/path/to/your/endpoints";

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
                       className="relative group"
                   >
                       <div className="min-w-[200px] h-[300px] rounded-lg overflow-hidden relative">
                           {/* Thumbnail Image */}
                           <img 
                               src={`/${index + 1}.jpg`} 
                               alt={video.name || `Video ${video.id}`}
                               className="w-full h-full object-cover"
                           />
                           
                           {/* Play Button Overlay */}
                           <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                               <PlayCircleIcon className="w-16 h-16 text-white drop-shadow-lg" />
                           </div>
                           
                           {/* Title Overlay */}
                           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                               <p className="text-white text-sm font-medium line-clamp-2">
                                   {video.name || video.id}
                               </p>
                           </div>
                       </div>
                   </Link>
               ))}
           </ul>
       </main>
   );
}