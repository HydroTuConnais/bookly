import React, { useEffect, useRef, useState } from "react";
import { useDocuments, Document } from "@/components/context/useDocuments";

import { useQueryClient } from 'react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

import { LucideShieldEllipsis } from "lucide-react";
import { toast } from "sonner";

interface ActionDocumentProps {
    initialData: Document;
}

export const ActionDocument = ({
    initialData
}: ActionDocumentProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { updateDocument, archiveDocument, restoreDocument } = useDocuments();
    const queryClient = useQueryClient();

    const [value, setValue] = useState(initialData.title || "");
    const [isEditing, setIsEditing] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const disableInput = () => {
        setIsEditing(false);
        setValue(value);
    };

    const [isSubmittingPublish, setIsSubmittingPublish] = useState(false);
    const handlePublish = async () => {
        await onPublish();
        disableInput();
    };

    const onPublish = () => {
        setIsSubmittingPublish(true);

        const promise = updateDocument({
            id: initialData.id,
            isPublished: true,
        })
            .finally(() => { setIsSubmittingPublish(false); setIsPopoverOpen(false) });

        queryClient.invalidateQueries(["documents", initialData.isPublished]);

        toast.promise(promise, {
            loading: "Publishing...",
            success: "Note Published",
            error: "Failed to publish note.",
        });
    }

    const handleUnpublish = async () => {
        await unPublish();
        disableInput();
    };

    const unPublish = () => {
        setIsSubmittingPublish(true);

        const promise = updateDocument({
            id: initialData.id,
            isPublished: false,
        })
            .finally(() => { setIsSubmittingPublish(false); setIsPopoverOpen(false) });

        queryClient.invalidateQueries(["documents", initialData.isPublished]);

        toast.promise(promise, {
            loading: "Unpublishing...",
            success: "Note unpublished",
            error: "Failed to unublish note.",
        });
    }

    const [isSubmittingArchive, setIsSubmittingArchive] = useState(false);
    const handleArchive = async () => {
        onArchive();
        disableInput();
    };

    const onArchive = () => {
        setIsSubmittingArchive(true);

        const promise = archiveDocument({
            id: initialData.id,
        })
            .finally(() => { setIsSubmittingArchive(false); setIsPopoverOpen(false) });

        queryClient.invalidateQueries(["documents", initialData.isArchived]);

        toast.promise(promise, {
            loading: "Archiving...",
            success: "Note archived",
            error: "Failed to archive note.",
        });
    }

    const handleUnarchive = async () => {
        unArchive();
        disableInput();
    };

    const unArchive = () => {
        setIsSubmittingArchive(true);

        const promise = restoreDocument({
            id: initialData.id,
        })
            .finally(() => { setIsSubmittingArchive(false); setIsPopoverOpen(false) });

        queryClient.invalidateQueries(["documents", initialData.isArchived]);

        toast.promise(promise, {
            loading: "Unarchiving...",
            success: "Note unarchived",
            error: "Failed to unarchive note.",
        });
    }


    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger className="w-full mt-[0.25rem] mb-4">
                <button
                    className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-600"
                >
                    <LucideShieldEllipsis className="w-5 h-5" />
                </button>
            </PopoverTrigger>
            <PopoverContent
                className="p-2 w-15"
                style={{ boxShadow: "rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px" }}
                align="center"
            >
                <div className="flex flex-col items-center gap-2 gap-x-1">
                    <div>
                        {!initialData.isPublished ? (
                            <Button variant="ghost" size="sm" onClick={handlePublish} disabled={isSubmittingPublish}>
                                Publish
                            </Button>
                        ) : (
                            <Button variant="ghost" size="sm" onClick={handleUnpublish} disabled={isSubmittingPublish}>
                                Unpublish
                            </Button>
                        )}
                    </div>

                    <div>
                        {!initialData.isArchived ? (
                            <Button variant="ghost" size="sm" onClick={handleArchive} disabled={isSubmittingArchive}>
                                Archive
                            </Button>
                        ) : (
                            <Button variant="ghost" size="sm" onClick={handleUnarchive} disabled={isSubmittingArchive}>
                                UnArchive
                            </Button>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};