import { useAuth } from "@/components/context/useAuth";
import { useDocuments } from "@/components/context/useDocuments";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronsRight, ChevronDown, ChevronRight, LucideIcon, Plus, MoreHorizontal, Trash, Stars, Star, StarOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "@/components/context/useTheme";

interface ItemProps {
    category?: string;
    id?: string;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    isFavorite?: boolean;
    isPublished?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: React.ElementType;
    childCount?: number;
}

const CategoryProps = {
    favorite: "favorite",
    document: "document"
} as const;

type CategoryPropsType = typeof CategoryProps[keyof typeof CategoryProps];

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
    isPublished,
    level = 0,
    onExpand,
    expanded,
    childCount = 0


}: ItemProps) => {
    const { user } = useAuth();
    const { createDocument, archiveDocument, setfavoriteDocument, unfavoriteDocument } = useDocuments();
    const navigate = useNavigate()
    const { resolvedTheme } = useTheme();

    const [isHovered, setIsHovered] = useState(false);

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onExpand?.();
    };

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;
        const promise = createDocument({ title: "Sans titre", parentDocumentId: id })
            .then((documentId) => {
                if (!expanded) {
                    onExpand?.();
                }
                console.log("documentId:", documentId);
                navigate(`/documents/${documentId}`);
            });

        toast.promise(promise, {
            loading: "Creating document...",
            success: "Document created",
            error: "Error creating document",
            style: {
                background: resolvedTheme === "dark" ? "#333" : "#fff",
                color: resolvedTheme === "dark" ? "#fff" : "#000",
            }
        });
    };

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;

        const promise = archiveDocument({ id }).then
            ((documentId) => {
                //navigate(`/documents`);
            })
            .catch((error) => {
                console.error("Error archiving document:", error
                )
            });

        toast.promise(promise, {
            loading: "Archiving document...",
            success: "Document archived",
            error: "Error archiving document",
            style: {
                background: resolvedTheme === "dark" ? "#333" : "#fff",
                color: resolvedTheme === "dark" ? "#fff" : "#000",
            }
        });
    }

    const onFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;

        const promise = setfavoriteDocument({ documentId: id }).then
            ((documentId) => {
                console.log("set favorite documentId:", documentId);
                // console.log(documentId);
            })
            .catch((error) => {
                console.error("Error archiving document:", error
                )
            });

        toast.promise(promise, {
            loading: "Set bookmark...",
            success: "Bookmark was set",
            error: "Error set bookmark document",
            style: {
                background: resolvedTheme === "dark" ? "#333" : "#fff",
                color: resolvedTheme === "dark" ? "#fff" : "#000",
            }
        });
    }

    const unFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;

        const promise = unfavoriteDocument({ documentId: id }).then
            ((documentId) => {
                console.log("unset favorite documentId:", documentId);
                // console.log(documentId);
            })
            .catch((error) => {
                console.error("Error archiving document:", error
                )
            });

        toast.promise(promise, {
            loading: "Unset bookmark...",
            success: "Bookmark was unset",
            error: "Error unset bookmark document",
            style: {
                background: resolvedTheme === "dark" ? "#333" : "#fff",
                color: resolvedTheme === "dark" ? "#fff" : "#000",
            }
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
                "group flex items-center h-[30px] w-full text-[14px] py-[5px] px-[8px] hover:bg-neutral-200 hover:dark:bg-neutral-700 hover:rounded-md text-muted-foreground font-medium",
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
                <div className="flex flex-col gap-4">
                    {isHovered && childCount > 0 ? (
                        <div
                            role="button"
                            className="w-[24.4px] select-none p-[0.2rem] hover:bg-primary/5 rounded-md transition-colors duration-200 flex items-center justify-center"
                            onClick={handleExpand}
                        >
                            <CheveronIcon
                                className="w-4 h-4 shrink-0 text-muted-foreground"
                            />
                        </div>
                    ) : (
                        documentIcon ? (
                            <div className="w-[24.4px] select-none p-[0.2rem] hover:bg-primary/5 rounded-md transition-colors duration-200 flex items-center justify-center">
                                <div className="w-5 h-5 shrink-0 text-muted-foreground">
                                    {documentIcon}
                                </div>
                            </div>
                        ) : (
                            <Icon />
                        )
                    )}
                </div>
            )}

            {!id && (
                <div>
                    <Icon className="h-4 mr-2 shrink-0 text-muted-foreground" />
                </div>
            )}
            <span className="m-1 truncate">
                {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⊞</span>+ C
                </kbd>
            )}
            {!!id && (
                <div className="flex items-center justify-end w-0 ml-auto group-hover:w-auto gap-x-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            onClick={(e) => e.stopPropagation()}
                            asChild
                        >
                            <div
                                role="button"
                                className="w-[24.4px] p-[0.2rem] opacity-0 group-hover:opacity-100 rounded-sm hover:bg-primary/5"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            style={{ boxShadow: "rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px" }}
                            forceMount
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/*Favorite List */}
                            {isFavorite && (
                                <DropdownMenuItem onClick={unFavorite}>
                                    <StarOff className="w-4 h-4 mr-1" />
                                    Remove from favorites
                                </DropdownMenuItem>
                            )}

                            {/*Document List */}
                            {!isFavorite && (
                                <DropdownMenuItem onClick={onFavorite}>
                                    <Star className="w-4 h-4 mr-1" />
                                    Add to favorites
                                </DropdownMenuItem>
                            )}

                            {category === CategoryProps.document && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={onArchive}>
                                        <Trash className="w-4 h-4 mr-1" />
                                        Delete
                                    </DropdownMenuItem>
                                </>
                            )}
                            <DropdownMenuSeparator />
                            <div className="p-2 text-xs text-muted-foreground">
                                Last edited by: {user?.name}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        role="button"
                        onClick={onCreate}
                        className="w-[24.4px] p-[0.2rem] opacity-0 group-hover:opacity-100 rounded-sm hover:bg-primary/5"
                    >
                        <Plus className="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>
            )}
        </div>
    );
};