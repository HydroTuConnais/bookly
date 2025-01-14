import { useDocuments } from "@/components/context/useDocuments";
import { useImage } from "@/components/context/useImage";
import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/hooks/use-cover-image";
import { usePromise } from "@/hooks/usePromise";
import { cn } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

interface CoverImageProps {
    url?: string | null;
    preview?: string;
}

export const Cover = ({
    url,
    preview
}: CoverImageProps) => { 
    const params = useParams();
    const documentId = params.documentId;
    
    const { remove } = useImage();
    const { updateDocument } = useDocuments();

    
    const onDelete = async () => {
        if(url && documentId) {
            const response = await remove({ 
                url,
                documentId
            });
            
            if (response !== undefined && response !== null && documentId) {
                updateDocument({ id: documentId });
            }
        }
    };
    
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
                    className="object-cover w-full h-full"
                />
            )}
            {url && !preview && (
                <div className="absolute flex items-center opacity-0 group-hover:opacity-100 bottom-5 right-5 gap-x-2">
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
                        onClick={onDelete}
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