import { useAuth } from "@/components/context/useAuth";
import { useDocuments } from "@/components/context/useDocuments";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronsRight, ChevronDown, ChevronRight, LucideIcon, Plus, MoreHorizontal, Trash, Stars, Star, StarOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ItemProps {
    category?: string;
    id?: string;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    isFavorite?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: React.ElementType;
    childCount?: number;
};

export const Item = ({
    category,
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    isFavorite,
    level = 0,
    onExpand,
    expanded,
    childCount = 0


}: ItemProps) => {
    const { user } = useAuth();
    const { createDocument, archiveDocument, favoriteDocument, unfavoriteDocument } = useDocuments();
    const navigate = useNavigate();

    const [isHovered, setIsHovered] = useState(false);

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onExpand?.();
    };

    // Verifie la category de la sidebar
    const [isDocumentCategory, setIsDocumentCategory] = useState(false);

    useEffect(() => {
        if (category === 'document') {
            setIsDocumentCategory(true);
        } else {
            setIsDocumentCategory(false);
        }
    }, [category]);

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;
        const promise = createDocument({ title: "New Document", parentDocumentId: id })
            .then((documentId) => {
                if (!expanded) {
                    onExpand?.();
                }
                // console.log(documentId);

                //navigate(`/documents/${documentId}`);
            });

        toast.promise(promise, {
            loading: "Creating document...",
            success: "Document created",
            error: "Error creating document"
        });
    };

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;

        const promise = archiveDocument({ id }).then
            ((documentId) => {
                // console.log(documentId);
            })
            .catch((error) => {
                console.error("Error archiving document:", error
                )
            });

        toast.promise(promise, {
            loading: "Archiving document...",
            success: "Document archived",
            error: "Error archiving document"
        });
    }

    const onFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;

        const promise = favoriteDocument({ documentId: id }).then
            ((documentId) => {
                // console.log(documentId);
            })
            .catch((error) => {
                console.error("Error archiving document:", error
                )
            });

        toast.promise(promise, {
            loading: "Set bookmark...",
            success: "Bookmark was set",
            error: "Error set bookmark document"
        });
    }

    const unFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;

        const promise = unfavoriteDocument({ documentId: id }).then
            ((documentId) => {
                // console.log(documentId);
            })
            .catch((error) => {
                console.error("Error archiving document:", error
                )
            });

        toast.promise(promise, {
            loading: "Unset bookmark...",
            success: "Bookmark was unset",
            error: "Error unset bookmark document"
        });
    }


    const CheveronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div
            onClick={onClick}
            role="button"
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
            className={cn(
                "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                active && "bg-primary/5 text-primary"
            )}
            onMouseEnter={() => {
                setIsHovered(true);
                //console.log('childCount:', childCount);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
        >
            {!!id && (
                // Cheveron expand
                <div>
                    {isHovered && childCount > 0 ? (
                        <div
                            role="button"
                            className="h-full rounded-sm p-[0.2rem] hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
                            onClick={handleExpand}
                        >
                            <CheveronIcon
                                className="shrink-0 w-4 h-[18px] text-muted-foreground"
                            />
                        </div>
                    ) : (
                        documentIcon ? (
                            <div className="shrink-0 h-[18px]">
                                {documentIcon}
                            </div>
                        ) : (
                            <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
                        )
                    )}
                </div>
            )}

            {!id && (
                <div>
                    <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
                </div>
            )}
            <span className="truncate">
                {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⊞</span>+ C
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            onClick={(e) => e.stopPropagation()}
                            asChild
                        >
                            <div
                                role="button"
                                className="opacity-0 group-hover:opacity-100 h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
                            >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                            onClick={(e) => e.stopPropagation()}
                        >

                            {/*Favorite List */}
                            {isFavorite && (
                                <DropdownMenuItem onClick={unFavorite}>
                                    <StarOff className="h-4 w-4 mr-1" />
                                    Remove to favorites
                                </DropdownMenuItem>
                            )}

                            {/*Document List */}
                            {!isFavorite && (
                                <DropdownMenuItem onClick={onFavorite}>
                                    <Star className="h-4 w-4 mr-1" />
                                    Add to favorites
                                </DropdownMenuItem>
                            )}

                            {isDocumentCategory && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={onArchive}>
                                        <Trash className="h-4 w-4 mr-" />
                                        Delete
                                    </DropdownMenuItem>
                                </>
                            )}
                            <DropdownMenuSeparator />
                            <div className="text-xs text-muted-foreground p-2">
                                Last edited by: {user?.name}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        role="button"
                        onClick={onCreate}
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
                    >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            )}
        </div>
    )
};