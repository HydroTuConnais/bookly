import React from "react";

export const CardAdd = () => {
    return (
        <div className="flex flex-col items-center justify-center w-[240px] h-[335px] border rounded-lg shadow-lg dark:shadow-md dark:border-white dark:shadow-white cursor-pointer group">
            <div className="h-full w-full">
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="text-6xl text-neutral-800 dark:text-white">+</div>
                    <div className="mt-2 text-sm font-semibold text-neutral-800 dark:shadow-md dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Add new page
                    </div>
                </div>
            </div>
        </div>
    );
};