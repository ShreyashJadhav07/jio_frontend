import { cn } from "@/lib/utils";

function Skeleton({ className }) {
    return (
        <div
            className={cn("animate-pulse rounded-md-bg-muted", className)}
                  style={{ backgroundColor: "hsl(0, 0%, 15%)" }}
             />
        
    )
    };

export { Skeleton };