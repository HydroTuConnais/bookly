import React, { useEffect, useRef, useState } from "react";
import { useAuth, UserProfile } from "@/components/context/useAuth";
import { useQueryClient } from 'react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InputEmailProps {
    initialData: UserProfile;
}

export const InputEmail = ({
    initialData
}: InputEmailProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { updateUser } = useAuth();
    const queryClient = useQueryClient();

    const [value, setValue] = useState(initialData.email || "");
    const [isEditing, setIsEditing] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const enableInput = () => {
        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.email || "");
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
        setValue(value);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        // Vérification basique : doit contenir "@" et "."
        if (newValue.includes("@") && newValue.includes(".")) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            const newTimeoutId = setTimeout(() => {
                handleUpdateDocument({ email: newValue });
                toast.success("Changement d'adresse email enregistré.");
            }, 500);
            setTimeoutId(newTimeoutId);
        } else {
            toast.error("Veuillez entrer une adresse email valide.");
        }
    };

    const handleUpdateDocument = async (params: { email?: string }) => {
        await updateUser(params);
        queryClient.invalidateQueries(["users", params.email]);
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
                    className="h-6 px-2 w-36 dark:bg-neutral-900 focus-visible:ring-blue-500"
                />
            ) : (
                <Button
                    onClick={enableInput}
                    variant="ghost"
                    size="lg"
                    className="h-auto px-4 py-2 font-normal hover:bg-neutral-300 hover:dark:bg-neutral-600"
                >
                    <span className="truncate">{initialData.email}</span>
                </Button>
            )}
        </div>
    );
};