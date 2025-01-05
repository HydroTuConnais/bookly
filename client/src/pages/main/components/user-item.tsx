import React, { useEffect } from "react"

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
    const { user, logoutUser } = useAuth();

    useEffect(() => {
        console.log(user);
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center text-sm p-1 mb-2 w-full rounded-sm hover:bg-primary/5">
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={user?.imageUrl || "avatar-default.png"} alt="Avatar" />
                        </Avatar>
                        <span className="text-start font-medium line-clamp-1">
                            {user?.name}&apos;s Bookly
                        </span>
                    </div>
                    <ChevronsLeftRight className="rotate-90 ml-2 text-center justify-center text-muted-foreground h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80 border rounded-md border-primary/5 dark:border-neutral-800"
                style={{ boxShadow: "rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px"}}
                align="start"
                alignOffset={11}
                forceMount
            >
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.email}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-md p-1">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.imageUrl || "avatar-default.png"} alt="Avatar" />
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
