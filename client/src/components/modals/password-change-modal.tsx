import React, { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { useAuth } from "../context/useAuth";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";


interface InputPasswordModalProps {
    children: React.ReactNode;
    title: string;
    description: string;
    onConfirm: (newPassword: string) => void;
}

export const InputPasswordModal = ({
    children,
    title,
    description,
    onConfirm,
}: InputPasswordModalProps) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const auth = useAuth();

    useEffect(() => {
        if (!isOpen) {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setError("");
            setIsPasswordValid(false);
        }
    }, [isOpen]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (oldPassword.length > 0) {
            timeoutId = setTimeout(() => {
                auth.checkPassword(oldPassword).then((res) => {
                    if (!res) {
                        setError("Current password is incorrect");
                        setIsPasswordValid(false);
                    } else {
                        setError("");
                        setIsPasswordValid(true);
                    }
                });
            }, 1000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [oldPassword]);

    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (newPassword !== confirmPassword) {
            setError("New passwords don't match");
            return;
        }
        onConfirm(newPassword);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
    };

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };

    const isValid = oldPassword.trim() && newPassword.trim() &&
        confirmPassword.trim() && newPassword === confirmPassword;

    return (
        <div onClick={handleClickOutside} className="z-[99992] inset-1">
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
                    {children}
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="my-4 space-y-4">
                        <Input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Current password"
                            className={`${error ? "ring-2 ring-red-500" : ""}`}
                        />
                        {isPasswordValid && (
                            <div className="flex flex-col space-y-4">
                                <Input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New password"
                                />
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                />
                            </div>
                        )}
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="dark:text-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirm}
                            disabled={!isValid}
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div >
    );
};