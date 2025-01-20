import React, { useEffect, useRef, useState } from "react";
import { useDocuments, Document } from "@/components/context/useDocuments";
import { useQueryClient } from 'react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleProps {
    initialData: Document;
}

export const Title = ({
    initialData
}: TitleProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { updateDocument } = useDocuments();
    const queryClient = useQueryClient();

    const [title, setTitle] = useState(initialData.title || "Untitled");
    const [isEditing, setIsEditing] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const enableInput = () => {
        setIsEditing(true);
        setTimeout(() => {
            setTitle(initialData.title || "Untitled");
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
        setTitle(title);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            handleUpdateDocument({ id: initialData.id, title: e.target.value });
        }, 250);
        setTimeoutId(newTimeoutId);
    };

    const handleUpdateDocument = async (params: { id: string, title?: string, content?: string, icon?: string }) => {
        await updateDocument(params);
        queryClient.invalidateQueries(["document", params.id]);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            disableInput();
            setTitle(e.currentTarget.value);
        }
    };

    return (
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing ? (
                <Input
                    ref={inputRef}
                    value={title}
                    onChange={onChange}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    className="h-6 dark:bg-neutral-900 px-2 focus-visible:ring-blue-500"
                />
            ) : (
                <Button
                    onClick={enableInput}
                    variant="ghost"
                    size="sm"
                    className="font-normal h-auto p-1"
                >
                    <span className="truncate">{initialData.title}</span>
                </Button>
            )}
        </div>
    );
};