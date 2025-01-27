import React, { useState } from "react";
import {
    PopoverTrigger,
    Popover,
    PopoverContent,
} from "@/components/ui/popover"
import { useOrigin } from "@/hooks/use-origin";
import { Document, useDocuments } from "@/components/context/useDocuments";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";

interface PublishProps {
    initialData: Document;
}

export const Publish = ({ initialData }: PublishProps) => {
    const origin = useOrigin();
    const { updateDocument } = useDocuments();

    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const url = `${origin}/preview/${initialData.id}`;

    const onPublish = () => {
        setIsSubmitting(true);

        const promise = updateDocument({
            id: initialData.id,
            isPublished: true,
        })
            .finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Publishing...",
            success: "Note Published",
            error: "Failed to publish note.",
        });
    }

    const unPublish = () => {
        setIsSubmitting(true);

        const promise = updateDocument({
            id: initialData.id,
            isPublished: false,
        })
            .finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Unpublishing...",
            success: "Note unpublished",
            error: "Failed to unublish note.",
        });
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" value="ghost">
                    Publish
                    {initialData.isPublished && (
                        <Globe
                            className="w-4 h-4 ml-2 text-sky-500"
                        />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-72"
                align="end"
                alignOffset={8}
                forceMount
            >
                {initialData.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="w-4 h-4 text-sky-500 animate-pulse" />
                            <p className="text-xs font-medium text-sky-500">
                                This note is live on web.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input
                                className="flex-1 h-8 px-2 text-xs truncate border rounded-l-md bg-muted"
                                value={url}
                                disabled
                            />
                            <Button
                                onClick={onCopy}
                                disabled={copied}
                                className="h-8 rounded-l-none"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </Button>
                        </div>
                        <Button
                            size="sm"
                            className="w-full text-xs"
                            disabled={isSubmitting}
                            onClick={unPublish}
                        >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Globe
                            className="w-8 h-8 mb-2 text-muted-foreground"
                        />
                        <p className="mb-2 text-sm font-medium">
                            Publish this note
                        </p>
                        <span className="mb-4 text-xs text-muted-foreground">
                            Share your work with others.
                        </span>
                        <Button
                            disabled={isSubmitting}
                            onClick={onPublish}
                            className="w-full text-xs"
                            size="sm"
                        >
                            Publish
                        </Button>
                    </div>
                )}

            </PopoverContent>
        </Popover>
    )
}