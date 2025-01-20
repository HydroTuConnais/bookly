import { useDocuments } from "@/components/context/useDocuments";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Item } from "./item";
import { BookTextIcon } from "./icon/file-icon";
import { usePromise } from "@/hooks/usePromise";
import { useQuery } from "react-query";

interface DocumentListProps {
    parentDocumentId: string | null;
    level?: number;
}

export const DocumentList: React.FC<DocumentListProps> = ({
    parentDocumentId,
    level = 0,

}: DocumentListProps) => {
    const params = useParams();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const navigate = useNavigate();

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }));
    };

    const { documents, getSidebarDocuments } = useDocuments();

    const { data: documentsList, isLoading, isError, refetch } = useQuery(
        ["document", parentDocumentId],
        () => getSidebarDocuments({ parentDocumentId: parentDocumentId }),
        {
            refetchOnWindowFocus: true,
        }
    );

    useEffect(() => {
        refetch();
    }, [documents]);

    const onRedirect = (documentId: string) => {
        navigate(`/documents/${documentId}`);
    };

    if (isLoading) {
        <div className="hidden last:block text-xs text-center text-muted-foreground pb-2">
            <div className="animate-pulse group flex items-center h-[30px] w-full py-[5px] px-[8px]">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mr-1"></div>
                <span className="m-1 w-full h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></span>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-10"></div>
            </div>
        </div>
    };

    return (
        <>
            {
                documentsList?.map((document) => (
                    <div key={document.id}>
                        <Item
                            category="document"
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
                            isPublished={document.isPublished}
                        />
                        {expanded[document.id] && (
                            <DocumentList
                                parentDocumentId={document.id}
                                level={level + 1}
                            />
                        )}
                    </div>
                ))
            }
        </>
    );
}
