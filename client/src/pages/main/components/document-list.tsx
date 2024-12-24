import { useDocuments } from "@/components/context/useDocuments";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Item } from "./item";
import { BookTextIcon } from "./icon/file-icon";

interface DocumentListProps {
    parendDocumentId: string | null;
    level?: number;
    data?: string[];
}

export const DocumentList: React.FC<DocumentListProps> = ({
    parendDocumentId,
    level = 0,
}: DocumentListProps) => {
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

    const [documentsList, setDocumentsList] = React.useState<any[]>([]);
    const { documents, getSidebarDocuments } = useDocuments();

    useEffect(() => {

        getSidebarDocuments({ parentDocumentId: parendDocumentId })
            .then((data) => {
                setDocumentsList(data);
                data.forEach(doc => console.log(doc._count));
            })
            .catch((error) => {
                console.error("Error fetching documents:", error);
            });

    }, [documents, parendDocumentId]);

    const onRedirect = (documentId: string) => {
        navigate(`/documents/${documentId}`);
    };

    if (documentsList === undefined) {
        <>
            <div>Loading...</div>
        </>
    };

    return (
        <>
            <p
                style={{
                    paddingLeft: level ? `${(level * 12) + 25}px` : undefined
                }}
                className={cn(
                    "hidden text-sm font-medium text-muted-foreground/80",
                    expanded && "last:block",
                    level === 0 && "hidden",
                )}
            >
                No pages inside
            </p>
            {
                documentsList.map((document) => (
                    <div key={document.id}>
                        <Item
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
                        />
                        {expanded[document.id] && (
                            <DocumentList
                                parendDocumentId={document.id}
                                level={level + 1}
                            />
                        )}
                    </div>
                ))
            }
        </>
    );
}
