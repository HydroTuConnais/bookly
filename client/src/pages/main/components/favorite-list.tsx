import { useDocuments } from "@/components/context/useDocuments";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Item } from "./item";
import { BookTextIcon } from "./icon/file-icon";

interface FavoriteListProps {
    parentFavoriteId: string | null;
    level?: number;
    data?: string[];
    isChild: boolean;
}

export const FavoriteList: React.FC<FavoriteListProps> = ({
    parentFavoriteId,
    level = 0,
    isChild = false
}: FavoriteListProps) => {
    const params = useParams();
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
    const navigate = useNavigate();

    const onExpand = (documentId: string) => {
        console.log("onExpand", documentId);
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }));
    };

    const [favoriteList, setFavoriteList] = useState<any[]>([]);
    const { favorites, getSidebarFavoriteDocuments } = useDocuments();


    useEffect(() => {
        console.log("useEffect");
        console.log("parentFavoriteId", parentFavoriteId);
        getSidebarFavoriteDocuments({ parentFavoriteId, isChild})
            .then((documents) => {
                console.log("setFavoriteList", documents);
                setFavoriteList(documents);
            })
            .catch((error) => {
                console.error("Error fetching documents:", error);
            });
    }, [favorites, parentFavoriteId]);

    const onRedirect = (documentId: string) => {
        navigate(`/documents/${documentId}`);
    };

    if (favoriteList === undefined) {
        <>
            <div>Loading...</div>
        </>
    };

    return (
        <>
            <div className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                <div className="animate-pulse group flex items-center h-[30px] w-full py-[5px] px-[8px]">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mr-1"></div>
                    <span className="m-1 w-full h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></span>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-10"></div>
                </div>
            </div>
            {
                favoriteList.map((document) => (
                    <div key={document.id}>
                        <Item
                            category="favorite"
                            id={document.id}
                            onClick={() => onRedirect(document.id)}
                            label={document.title}
                            icon={BookTextIcon}
                            documentIcon={document.icon}
                            active={params.id === document.id}
                            level={level}
                            onExpand={() => onExpand(document.id)}
                            expanded={expanded[document.id]}
                            childCount={document._count.children}
                            isFavorite={document.isFavorite}
                        />
                        {expanded[document.id] && (
                            <FavoriteList
                                parentFavoriteId={document.id}
                                level={level + 1}
                                isChild={true}
                            />
                        )}
                    </div>
                ))
            }
        </>
    );
}
