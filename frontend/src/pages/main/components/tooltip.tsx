import React from "react";

interface TooltipProps {
    text: string;
    position: string;
    children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
    text,
    position,
    children
}) => {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-neutral-950">
            <div className="main-container relative w-auto h-auto">
                <div className={`text-white bg-black shadow-lg font-bold p-3 rounded-lg m-4 text-center absolute opacity-0 w-9/12 tip tip-${position}`}>{text}
                    {text}
                </div>
                {children}
            </div>
        </div>
    );
};