import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import React, { useEffect } from "react";

interface CoverImageProps {
    url?: string | null;
    preview?: string;
}

export const Cover = ({
    url,
    preview
}: CoverImageProps) => { 

    useEffect(() => {
        console.log("Cover Image URL: ", url);
    }, [url]);
    
    return (
        <div className={cn(
            "relative w-full h-[35vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <img
                    src={url}
                    alt="Cover"
                    className="object-cover"
                />
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button
                        onClick={() => {}}
                        className="text-muted-foreground bg-neutral-50 dark:bg-neutral-800 text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="h-4 w-4 mr-2"/>
                        Modifier l'image
                    </Button>
                    <Button
                        onClick={() => {}}
                        className="text-muted-foreground bg-neutral-50 dark:bg-neutral-800 text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <X className="h-4 w-4 mr-2"/>
                        Supprimer
                    </Button>
                </div>
            )}
        </div>
    )
};