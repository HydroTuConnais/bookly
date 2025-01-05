import React from "react"
import { Document } from "@/components/context/useDocuments";
import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";
import { Smile, X } from "lucide-react";

interface ToolbarProps {
    initialData: Document;
    preview?: boolean;
}

export const Toolbar = ({
    initialData,
    preview
}: ToolbarProps) => {
    return (
        <div className="pl-[54px] group relative">
            {!!initialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={() => {}}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {initialData.icon}
                        </p>
                    </IconPicker>
                    <Button
                        onClick={() => {}}
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 bg-neutral-300 dark:bg-neutral-800 transition text-muted-foreground text-xs"
                        variant="outline"
                        size="icon"                        
                        >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initialData.icon}
                    </p>
            )}
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-6">
                {!initialData.icon && !preview && (
                   <IconPicker asChild onChange={() => {}}>
                        <Button
                        className="text-muted-foreground text-xs bg-neutral-300 dark:bg-[#1F1F1F] hover:bg-neutral-200 dark:hover:bg-neutral-800 transition border-none"
                        variant="outline"
                        size="sm"
                        >
                            <Smile className="rounded-full bg-neutral-800 h-4 w-4 mr-2" />
                            Ajouter une icône
                        </Button>
                    </IconPicker>
                    )}
            </div>
        </div>
    )
}