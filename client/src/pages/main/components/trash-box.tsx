import { useDocuments } from "@/components/context/useDocuments";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Input } from "@/components/ui/input";
import { CheckboxItem } from "@radix-ui/react-dropdown-menu";
import { Search, Trash, Undo } from "lucide-react";
import React, { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const TrashBox = () => {
    const { getArchivedDocuments, restoreDocument, deleteDocument, documents } = useDocuments();
    const navigate = useNavigate();
    const params = useParams();

    const [search, setSearch] = useState("");
    const [archivedDocuments, setArchivedDocuments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getArchivedDocuments().then((data) => {
            setArchivedDocuments(data);
            setIsLoading(false)
        }).catch((error) => {
            console.error("Error fetching archived documents:", error);
        });
    }, []);

    const filteredDocuments = archivedDocuments.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId: string) => {
        navigate(`/documents/${documentId}`);
    };

    const onRestore = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: string) => {
        event.stopPropagation();
        const promise = restoreDocument({ id: documentId }).then(() => {
            setArchivedDocuments(archivedDocuments.filter((document) => document.id !== documentId));
        });

        toast.promise(promise, {
            loading: "Restoring document...",
            success: "Document restored",
            error: "Error restoring document"
        });
    };

    const onRemove = (documentId: string) => {
        const promise = deleteDocument({ documentId: documentId }).then(() => {
            setArchivedDocuments(archivedDocuments.filter((document) => document.id !== documentId));
        });

        toast.promise(promise, {
            loading: "Delete document...",
            success: "Document deleted",
            error: "Error delete document"
        });

        if (params.documentId === documentId) {
            navigate("/documents");
        }

        if (documents === undefined) {
            return (
                <div className="h-full flex items-center justify-center p-4 animate-pulse">
                    <div className="bg-gray-200 rounded w-20 h-4"></div>
                </div>
            )
        };
    };


    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 border bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:shadow-[inset_0_0_0_1px_#2383e291,0_0_0_2px_#2383e259]"
                    placeholder="Filter by page title..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                {isLoading ? (
                    <div className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                        <div className="animate-pulse group flex items-center h-[30px] w-full py-[5px] px-[5px]">
                            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mr-1"></div>
                            <span className="m-1 w-full h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></span>
                            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-10"></div>
                        </div>
                    </div>
                ) : (
                    <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                        No document found.
                    </p>
                )}
                {filteredDocuments.map((document) => (
                    <div
                        key={document.id}
                        role="button"
                        onClick={() => onClick(document.id)}
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
                    >
                        <div className="flex items-center truncate ">
                            {/* <Input
                                type="checkbox"
                                onClick={(e) => e.stopPropagation()}
                                className="h-4 w-4 focus-visible:ring-transparent bg-secondary"
                            /> */}
                            <span className="text-center text-muted-foreground w-full pl-2">
                                {document.title}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div
                                onClick={(e) => onRestore(e, document.id)}
                                role="button"
                                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                            >
                                <Undo className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(document.id)}>
                                <div
                                    role="button"
                                    onClick={(e) => e.stopPropagation()}
                                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                >
                                    <Trash className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}