import { useAuth } from "@/context/useAuth";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Separator } from "@/ui/separator";
import React from "react";

interface CardDocumentProps {
    imageUrl: string;
}

export const CardDocument: React.FC<CardDocumentProps> = ({ imageUrl }) => {
    const { user } = useAuth();
    return (
        <div className="flex flex-col items-center justify-center dark:bg-neutral-800 w-[240px] border rounded-lg shadow-md dark:shadow-md dark:border-white dark:shadow-white cursor-pointer transform transition-transform duration-300 hover:scale-105">
            <div className="h-full">
                <div className="rounded-t-lg rounded-br-none rounded-bl-none overflow-hidden">
                    <img
                    src={imageUrl + ".png"}
                    alt="Empty"
                    />
                </div>
                <div className="ml-4 p-1 pb-5">
                    <p className="flex mt-2 align-center justify-left text-lg font-semibold">
                    <img 
                        src="/folder.png"
                        className="h-6 w-6 mr-2"
                        alt="Mobile App"
                    />
                    Mobile App
                    </p>

                    <p className="flex mt-2 justify-left text-base font-semibold">
                    <img 
                        src="/paint-brush-black.svg"
                        className="h-6 w-6 mr-2"
                        alt="Mobile App"
                    />
                    Design
                    </p>
                    <Separator className='my-4 w-[200px] bg-gray-300 dark:bg-gray-600' />
                    <div className="flex flex-row items-center mt-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={user?.imageUrl || "avatar-default.png"} alt="Avatar" />
                        </Avatar>
                        <span className="text-start ml-2 font-medium ">
                            {user?.name}&apos;s
                        </span>
                    </div>
                    <div className="flex items-center mt-4">
                        <span className="flex flex-row items-center justify-center bg-blue-100 text-black font-bold text-xs mr-2 px-2.5 py-0.5 rounded-lg">
                            <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                            In Progress
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};