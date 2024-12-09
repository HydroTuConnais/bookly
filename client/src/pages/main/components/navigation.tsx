import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import React, { ElementRef, useEffect, useRef } from "react";

import { useMediaQuery } from "usehooks-ts";
import { useLocation } from "react-router-dom";

export const Navigation = () => {  
    const isMobile = useMediaQuery("(max-width: 768px)");    
    const { pathname } = useLocation();

    const isResizingRef = useRef(false);
    const sidebarref = useRef<ElementRef<"aside">>(null);
    const navbarref = useRef<ElementRef<"div">>(null);
    const [isReseting, setIsReseting] = React.useState(false);
    const [isCollapsed, setIsCollapsed] = React.useState(isMobile);

    useEffect(() => {
        if(isMobile) {
            collapse();
        }else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if(isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.preventDefault();
        e.stopPropagation();
        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        if (isMobile) {
            isResizingRef.current = true;
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if(!isResizingRef.current) return;
        let newWidth = e.clientX;

        if (newWidth < 240) newWidth = 240;
        else if (newWidth > 480) newWidth = 480;

        if(sidebarref.current && navbarref.current) {
            sidebarref.current.style.width = `${newWidth}px`;
            navbarref.current.style.setProperty("left", `${newWidth}px`);
            navbarref.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };
    
    const resetWidth = () => {
        if(sidebarref.current && navbarref.current) {
            setIsCollapsed(false);
            setIsReseting(true);

            sidebarref.current.style.width = isMobile ? "100%" : "240px";
            navbarref.current.style.setProperty("left", isMobile ? "100%" : "calc(100% - 240px)");
            navbarref.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");

            setTimeout(() => setIsReseting(false), 300);
        }
    };

    const collapse = () => {
        if(sidebarref.current && navbarref.current) {
            setIsCollapsed(true);
            setIsReseting(true);

            sidebarref.current.style.width = "0";
            navbarref.current.style.setProperty("left", "0");
            navbarref.current.style.setProperty("width", "100%");

            setTimeout(() => setIsReseting(false), 300);
        }
    }

    return (
        <>
        <aside
            ref={sidebarref}
            className={cn(
                "group/sidebar h-screen bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                isReseting && "transition-all ease-in-out duration-300",
                isMobile && "w-0"
             )}
        >
            <div onClick={collapse} role="button" className={cn(
                "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
            )}>
                <ChevronsLeft className="h-6 w-6"/>
            </div>
            <div>
                <p>Action</p>
            </div>
            <div className="mt-4">
                <p>Documents</p>
            </div>
            <div onMouseDown={handleMouseDown} onClick={resetWidth} className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"/>
        </aside>
        <div
        ref={navbarref}
        className={cn(
            "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
            isReseting && "transition-all ease-in-out duration-300",
            isMobile && "left-0 w-full"
        )}>
            <nav className="bg-transparent px-3 py-2 w-full">
                {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
            </nav>
        </div>
        </>
    );
}