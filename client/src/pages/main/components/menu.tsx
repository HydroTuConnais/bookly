import React from "react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDocuments } from "@/components/context/useDocuments";
import { MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/useAuth";
import { useTheme } from "@/components/context/useTheme";

interface MenuProps {
    documentId: string;
}

export const Menu = ({ documentId }: MenuProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { archiveDocument } = useDocuments();
    const { resolvedTheme } = useTheme();

    const onArchive = () => {
        const promise = archiveDocument({
            id: documentId
        }).then((data) => {
            // console.log(data);
        }).catch((error) => {
            console.error("Error creating document:", error);
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
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            className="w-60"
            align="end"
            style={{ boxShadow: "rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px"}}
            alignOffset={8}
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
    )
}