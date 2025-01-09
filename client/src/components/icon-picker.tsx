import React, { useEffect, useState } from "react";

import { useTheme } from "@/components/context/useTheme";
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@/components/ui/popover';
import emojisData from "@/pages/main/components/icon/emoji.json";
import { Search, Shuffle } from "lucide-react";
import { Button } from "./ui/button";

interface IconPickerProps {
    onDelete?: () => void;
    onChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
}

export const IconPicker = ({
    onDelete,
    onChange,
    children,
    asChild
}: IconPickerProps) => {
    const { resolvedTheme } = useTheme();
    const [search, setSearch] = useState('');
    const [hoveredIcon, setHoveredIcon] = useState<{ emoji: string; description: string; category: string } | null>(null);
    const [hoveredIconPosition, setHoveredIconPosition] = useState<{ top: number; left: number } | null>(null);

    // Organiser les émojis par catégorie
    const emojisByCategory = emojisData.reduce((acc: { [key: string]: typeof emojisData }, emoji) => {
        if (!acc[emoji.category]) {
            acc[emoji.category] = [];
        }
        acc[emoji.category].push(emoji);
        return acc;
    }, {});

    // Filtrer les émojis par description
    const filteredEmojisByCategory = Object.keys(emojisByCategory).reduce((acc: { [key: string]: typeof emojisData }, category) => {
        const filteredEmojis = emojisByCategory[category].filter(emoji =>
            emoji.description.toLowerCase().includes(search.toLowerCase())
        );
        if (filteredEmojis.length > 0) {
            acc[category] = filteredEmojis;
        }
        return acc;
    }, {});

    const onRandom = () => {
        const randomEmoji = emojisData[Math.floor(Math.random() * emojisData.length)];
        onChange(randomEmoji.emoji);
    };

    const handleMouseEnter = (emoji: {emoji: string; description: string; category: string} , event: React.MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setHoveredIcon(emoji);
        setHoveredIconPosition({ top: rect.top, left: rect.left });
    };    

    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent 
            className="p-0 w-[400px]"
            style={{ boxShadow: "rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px"}}>
                <div className="flex flex-col border border-none rounded-lg">    
                    <div className="flex items-center rounded-t-lg justify-between px-4 py-[6px] bg-neutral-100 dark:bg-[#222222]">
                        <span className="text-sm font-normal text-muted-foreground">
                            Choisissez une icône
                        </span>
                        {onDelete && <button
                            className="text-muted-foreground text-sm font-medium p-1 px-2 rounded-md hover:bg-neutral-300 hover:dark:bg-neutral-700"
                            onClick={onDelete}
                        >
                            Supprimer
                        </button>}
                    </div>
                    <div className="border-t border-neutral-300 dark:border-neutral-700"></div>
                    <div className="flex flex-row items-center justify-between mt-4 mb-4">
                        <div className="flex w-full h-7 px-2 rounded-md cursor-text">
                            <div className="flex w-full items-center border border-neutral-200 dark:border-neutral-600 px-1 bg-white dark:bg-neutral-700 rounded-md">
                                <Search className="w-5 h-5 text-muted-foreground mr-1"/>
                                <input
                                    type="text"
                                    placeholder="Filtrer..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full py-1 px-1 text-sm border border-none rounded-md bg-transparent outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex h-7 px-2 rounded-md border justify-center items-center border-neutral-200 dark:border-neutral-600 cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-700 mr-3">
                            <button onClick={onRandom}>
                                <Shuffle className="w-4 text-muted-foreground"/>
                            </button>
                        </div>
                    </div>
                    <div className="relative"> 
                        {/* {hoveredIcon && hoveredIconPosition && (
                            <div className="z-[99999] flex text-gray-300 text-xs absolute h-6 p-1 justify-start items-start bg-white border dark:bg-neutral-700 border-none rounded shadow-lg"
                            style={{ top: hoveredIconPosition.top, left: hoveredIconPosition.left}}>
                                {hoveredIcon.description}
                            </div>
                        )} */}
                        <div className="max-h-80 overflow-y-auto p-2">
                            {Object.keys(filteredEmojisByCategory).map((category) => (
                                <div key={category} className="flex flex-col mb-4"> 
                                    <h3 className="text-xs text-muted-foreground font-normal mb-2">{category}</h3>
                                    <div className="grid grid-cols-12 gap-1">
                                        {filteredEmojisByCategory[category].map((emoji, index) => (
                                            <button
                                                key={index}
                                                onMouseEnter={(e) => handleMouseEnter(emoji, e)}
                                                onMouseLeave={() => setHoveredIcon(null)}
                                                onClick={() => onChange(emoji.emoji)}
                                                className="flex justify-center items-center rounded-md hover:bg-neutral-200 dark:hover:bg-[#333333] transition"
                                            >
                                                <span className="text-2xl">{emoji.emoji}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
