import { useDocuments } from "@/components/context/useDocuments";
import { useImage } from "@/components/context/useImage";
import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/hooks/use-cover-image";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon, ImageIcon, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

interface CoverImageProps {
  url?: string | null;
  id: string;
  preview?: boolean;
  offset: number | null;
}

export const Cover = ({ url, id, preview, offset }: CoverImageProps) => {
  const params = useParams();
  const documentId = id;

  const { remove } = useImage();
  const { updateDocument, setImageOffset } = useDocuments();

  const [offsetY, setOffsetY] = useState(offset);
  const [isRepositioning, setIsRepositioning] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const onDelete = async () => {
    console.log("onDelete");
    console.log("url", url);
    console.log("documentId", documentId);
    if (url && documentId) {
      const response = await remove({
        url,
        documentId,
      });

      if (response !== undefined && response !== null && documentId) {
        updateDocument({ id: documentId });
      }
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPosition = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight - e.currentTarget.clientHeight;

    const newOffsetY = Math.min(100, Math.max(0.01, (scrollPosition / scrollHeight) * 100));
    setOffsetY(newOffsetY);
  };

  useEffect(() => {
    if (isRepositioning && scrollContainerRef.current && offsetY !== null) {
      const scrollContainer = scrollContainerRef.current;
      const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;

      const scrollTop = (offsetY / 100) * scrollHeight;
      scrollContainer.scrollTop = scrollTop;
    }
  }, [isRepositioning, offsetY]);

  useEffect(() => {
    if (documentId && !isRepositioning && offsetY !== null) {
      setImageOffset({ id: documentId, offset: offsetY });
    }
  }, [isRepositioning, setImageOffset, documentId, offsetY]);

  return (
    <div
      className={cn(
        "relative w-full h-[25vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {/* Image de couverture */}
      {!!url && (
        <img
          src={url}
          alt="Cover"
          className="object-cover w-full h-full"
          style={{
            objectPosition: `center ${offsetY}%`,
            userSelect: isRepositioning ? "none" : "auto",
            pointerEvents: isRepositioning ? "none" : "auto",
          }}
        />
      )}

      {/* Déplacement en mode repositionnement */}
      {isRepositioning && (
        <div
          ref={scrollContainerRef} // Attacher la référence
          className="absolute top-0 left-0 z-10 w-full h-full overflow-y-scroll bg-transparent"
          onScroll={handleScroll}
        >
          <div className="h-[100vh]" />
        </div>
      )}

      {/* Boutons d'action */}
      {url && !preview && (
        <div className="absolute z-20 flex items-center opacity-0 group-hover:opacity-100 bottom-5 right-5 gap-x-1">
          <Button
            onClick={() => setIsRepositioning(!isRepositioning)}
            className="text-xs text-muted-foreground bg-neutral-50 dark:bg-neutral-800"
            variant="outline"
            size="sm"
          >
            <ChevronsUpDownIcon className="w-4 h-4 mr-2" />
            {isRepositioning ? "Terminer" : "Repositionner"}
          </Button>
          <Button
            onClick={onDelete}
            className="text-xs text-muted-foreground bg-neutral-50 dark:bg-neutral-800"
            variant="outline"
            size="sm"
          >
            <X className="w-4 h-4 mr-2" />
            Supprimer
          </Button>
        </div>
      )}
    </div>
  );
};
