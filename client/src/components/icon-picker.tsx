import React from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "@/components/context/useTheme";
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@/components/ui/popover';

interface IconPickerProps {
    onChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
}

export const IconPicker = ({
    onChange,
    children,
    asChild
}: IconPickerProps) => {
    const { resolvedTheme } = useTheme();
    console.log('resolvedTheme', resolvedTheme);
    const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

    const themeMap = {
        "light": Theme.LIGHT,
        "dark": Theme.DARK
    };

    const theme = themeMap[currentTheme];

    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full border-none shadow-none">
                <EmojiPicker
                    height={450}
                    theme={theme}
                    onEmojiClick={(data) => {
                        onChange(data.emoji);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
};
