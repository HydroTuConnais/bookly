import { Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { RecoveryService } from '@/services/recoveryService';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/context/useAuth';

export const ConfirmRecoveryPagePassword: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id, token } = params;

    if (!id || !token) {
        navigate("/404");
    }

    const { data, isLoading, isError } = useQuery(
        ['recoveryPassword', id, token],
        () => {
            if (id && token) {
                console.log("id", id);
                return RecoveryService.recoveryPassword({ id, token });
            }
        },
        {
            refetchOnWindowFocus: true,
        }
    );

    if (!data) {
        navigate("/not-changed/password");
    }

    const onConfirm = (newPassword: string) => {
        console.log('Confirm password:', newPassword);
        if (token) {
            RecoveryService.changePassword({ token, password: newPassword }).then((response) => {
                if (response) {
                    navigate("/");
                }
            }).catch((error) => {
                console.error("Failed to change password:", error);
            });
        } else {
            console.error("Token is undefined");
        }
    };

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
                auth.checkPassword(oldPassword).then((res: any) => {
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

    const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900">
            <form onSubmit={handleConfirm} className="w-full max-w-md p-6 bg-white border border-black rounded shadow-md dark:border-white dark:bg-neutral-800">
                <h2 className="mb-4 text-2xl font-bold">Change Password</h2>
                <div className="space-y-4">
                    <Input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Current password"
                    />
                    {isPasswordValid && (
                        <div className="space-y-4">
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password"
                                className={`w-full p-2 border ${error ? "border-red-500" : "    "} rounded`}
                            />
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className={`w-full p-2 border ${error ? "border-red-500" : "    "} rounded`}
                            />
                        </div>
                    )}
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>

                <div className="flex justify-end mt-4 space-x-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
};