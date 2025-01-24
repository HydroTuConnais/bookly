import React, { useEffect, useRef, useState } from "react";
import { useAuth, UserProfile} from "@/components/context/useAuth";
import { useQueryClient } from 'react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InputEmailProps {
    initialData: UserProfile;
}

export const InputName = ({
    initialData
}: InputEmailProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { updateUser } = useAuth();
    const queryClient = useQueryClient();

    const [value, setValue] = useState(initialData.name || "Untitled");
    const [isEditing, setIsEditing] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const enableInput = () => {
        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.name || "Untitled");
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
        setValue(value);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            handleUpdateDocument({ name: e.target.value});
        }, 500);
        setTimeoutId(newTimeoutId);
    };

    const handleUpdateDocument = async (params: { name?:string }) => {
        await updateUser(params);
        queryClient.invalidateQueries(["users", params.name]);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            disableInput();
            setValue(e.currentTarget.value);
        }
    };

    return (
        <div className="flex items-center gap-x-1">
            {isEditing ? (
                <Input
                    ref={inputRef}
                    value={value}
                    onChange={onChange}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    className="h-6 w-24 px-2 dark:bg-neutral-900 focus-visible:ring-blue-500"
                />
            ) : (
                <Button
                    onClick={enableInput}
                    variant="ghost"
                    size="lg"
                    className="h-auto px-4 py-2 font-normal hover:bg-neutral-300 hover:dark:bg-neutral-600"
                >
                    <span className="truncate">{initialData.name}</span>
                </Button>
            )}
        </div>
    );
};