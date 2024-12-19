import { useAuth } from "@/components/context/useAuth";
import { useDocuments } from "@/components/context/useDocuments";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronsRight, ChevronDown, ChevronRight, LucideIcon, Plus, MoreHorizontal, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ItemProps {
    id?: string;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: React.ElementType;
};

export const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    level = 0,
    onExpand,
    expanded,


}: ItemProps) => {
    const { user } = useAuth();
    const { createDocument, archiveDocument} = useDocuments();
    const navigate = useNavigate();

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onExpand?.();
    };

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(id);
        event.stopPropagation();
        if (!id) return;
        const promise = createDocument({ title: "New Document", parentDocumentId: id })
            .then((documentId) => {
                if (!expanded) {
                    onExpand?.();
                }
                console.log(documentId);

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
        if(!id) return;
        
        const promise = archiveDocument({ id }).then
        ((documentId) => {
            console.log(documentId);
        })
        .catch((error) => {
            console.error("Error archiving document:", error
        )}); 

        toast.promise(promise, {
            loading: "Archiving document...",
            success: "Document archived",
            error: "Error archiving document"
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
        >
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
                    onClick={handleExpand}
                >
                    <CheveronIcon
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                    />
                </div>
            )}

            {documentIcon ? (
                <div className="shrink-0 h-[18px]">
                    {documentIcon}
                </div>
            ) : (
                <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
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
                        className="w-40"
                        align="start"
                        side="right"
                        forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
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