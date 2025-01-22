import React, { useEffect, useState } from "react"

import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ChevronsLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/useAuth";

export const UserItem = () => {
    const { user, updateUser, logoutUser } = useAuth();

    useEffect(() => {
        console.log("user", user);
    }, [user, updateUser]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center w-full p-1 mb-2 text-sm rounded-sm hover:bg-primary/5">
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src={user?.imageUrl || "/avatar-default.png"} alt="Avatar" />
                        </Avatar>
                        <span className="font-medium text-start line-clamp-1">
                            {user?.name}&apos;s Bookly
                        </span>
                    </div>
                    <ChevronsLeftRight className="justify-center w-4 h-4 ml-2 text-center rotate-90 text-muted-foreground" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="border rounded-md w-80 border-primary/5 dark:border-neutral-800"
                style={{ boxShadow: "rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px" }}
                align="start"
                alignOffset={11}
                forceMount
            >
                <div className="flex flex-col p-2 space-y-4">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.email}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <div className="p-1 rounded-md">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={user?.imageUrl || "/avatar-default.png"} alt="Avatar" />
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm line-clamp-1">
                                {user?.name}&apos;s Bookly
                            </p>
                            {/* <p className="text-xs text-muted-foreground">
                                {user?.email}
                            </p> */}
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="!p-0 !m-0">
                    <Button className="w-full dark:bg-[#1F1F1F] hover:bg-neutral-300 dark:hover:bg-neutral-700" variant="ghost" onClick={logoutUser}>
                        Logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
