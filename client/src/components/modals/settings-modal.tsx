import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

import { useSettings } from "@/hooks/use-options";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "../mode-toggle";

export const SettingsModal = () => {
    const [isMounted, setIsMounted] = useState(false);

    const { isOpen, onClose, onOpen} = useSettings();
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle className="hidden"></DialogTitle>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">
                        Mes settings
                    </h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>
                            Thèmes
                        </Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Changer le thème de l&apos;application
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    );
};