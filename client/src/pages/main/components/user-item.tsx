import React from "react"

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
    const user = useAuth().user;
    const { logoutUser } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={user?.imageUrl || "avatar-default.png"} alt="Avatar" />
                        </Avatar>
                        <span className="text-start font-medium line-clamp-1">
                            {user?.name}&apos;s Notion Lite
                        </span>
                    </div>
                    <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80"
                align="start"
                alignOffset={11}
                forceMount
            >
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.email}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-md bg-secondary p-1">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.imageUrl || "avatar-default.png"} alt="Avatar" />
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm line-clamp-1">
                                {user?.name}&apos;s Notion Lite
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button className="w-full hover:bg-[#1F1F1F] hover:text-white dark:bg-white dark:bg-dark dark:hover:bg-white dark:hover:text-black" variant="outline" onClick={logoutUser}>
                        Logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
