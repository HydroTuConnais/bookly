import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
} from "@/components/ui/dialog";

import { useSettings } from "@/hooks/use-options";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Assurez-vous d'avoir un composant Input
import { Button } from "@/components/ui/button"; // Assurez-vous d'avoir un composant Button
import { useBoarding } from "@/hooks/use-boarding";
import { useImage } from "../context/useImage";
import { useAuth } from "../context/useAuth";

export const BoardingModal = () => {
    const [isMounted, setIsMounted] = useState(false);

    const [username, setUsername] = useState(""); // Pseudonyme de l'utilisateur
    const [imageUrl, setImage] = useState<string>("");

    const [file, setFile] = useState<File | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { isOpen, onClose, onOpen } = useBoarding();
    const { updateUser } = useAuth();
    const image = useImage();

    useEffect(() => {
        setIsMounted(true);
    }, []);


    if (!isMounted) {
        return null;
    }

    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);

            const response = await image.upload({
                file
            });

            if (response !== undefined && response !== null) {
                setImage(response);
            };
        }
    };

    const handleSubmit = () => {
        updateUser({ name: username, imageUrl, boardingStatus: true }).then(() => {
            onClose();
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="dark:bg-[#1F1F1F]">
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium text-center">Configurer votre profil</h2>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 mt-4">
                    {/* Rond avec image ou placeholder */}
                    <div className="relative">
                        <label
                            htmlFor="imageInput"
                            className="h-24 w-24 rounded-full bg-neutral-300 dark:bg-neutral-700 overflow-hidden cursor-pointer border-2 border-neutral-400 dark:border-neutral-600 flex items-center justify-center"
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="Profil"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-neutral-500">+</span>
                            )}
                        </label>
                        <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => onChange(e.target.files?.[0])}
                        />
                    </div>

                    {/* Champ pour pseudonyme */}
                    <div className="w-full">
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Entrez votre pseudonyme"
                            className="mt-2"
                        />
                    </div>

                    {/* Bouton pour valider */}
                    <DialogFooter className="w-full">
                        <Button
                            onClick={handleSubmit}
                            disabled={!username.trim()}
                            className="w-full"
                        >
                            Sauvegarder
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};
