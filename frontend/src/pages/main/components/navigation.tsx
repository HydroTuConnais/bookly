import React, { useRef, useState, useEffect, ElementRef } from 'react';

import { useMediaQuery } from "usehooks-ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDocuments } from "@/components/context/useDocuments";

import { DocumentList } from "./document-list";
import { UserItem } from "./user-item";
import { Item } from "./item";

import { ChevronsLeft, ChevronsRight, Home, MenuIcon, PlusCircle, Search, Settings, Shield, Trash } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { TrashBox } from './trash-box';

import "../style/navigation.css";
import { FavoriteList } from './favorite-list';
import { useSearch } from '@/hooks/use-search';
import { useSettings } from '@/hooks/use-options';
import { Navbar } from './navbar';
import { usePromise } from '@/hooks/usePromise';
import { useTheme } from '@/components/context/useTheme';
import { usePanel } from '@/hooks/use-panel';
import { useAuth } from '@/components/context/useAuth';

export const Navigation = () => {
    const search = useSearch();
    const settings = useSettings();
    const params = useParams();
    const panel = usePanel();
    const { user } = useAuth();
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { pathname } = useLocation();
    const { resolvedTheme } = useTheme();

    const isResizingRef = useRef(false);
    const sidebarref = useRef<ElementRef<"aside">>(null);
    const navbarref = useRef<ElementRef<"div">>(null);
    const [isReseting, setIsReseting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    const [haveFavorites, setHaveFavorites] = useState(false);

    const {
        createDocument,
        setfavoriteDocument,
        unfavoriteDocument,
        getSidebarCountFavoriteDocuments,
    } = useDocuments();

    const { data, loading, error } = usePromise(() => getSidebarCountFavoriteDocuments(), [setfavoriteDocument, unfavoriteDocument]);

    useEffect(() => {
        if (data !== null) {
            setHaveFavorites(data > 0);
        }
        if (error) {
            console.error("Error fetching documents:", error);
        }
    }, [data, error]);


    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    useEffect(() => {
        // console.log("userNavigation", user);
    }, [user]);

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
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;

        if (newWidth < 240) newWidth = 240;
        else if (newWidth > 480) newWidth = 480;

        if (sidebarref.current && navbarref.current) {
            sidebarref.current.style.width = `${newWidth}px`;
            navbarref.current.style.setProperty("left", `${newWidth}px`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth = () => {
        if (sidebarref.current && navbarref.current) {
            setIsCollapsed(false);
            setIsReseting(true);

            sidebarref.current.style.width = isMobile ? "100%" : "240px";
            navbarref.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px)");
            navbarref.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px");

            setTimeout(() => setIsReseting(false), 300);
        }
    };

    const collapse = () => {
        if (sidebarref.current && navbarref.current) {
            setIsCollapsed(true);
            setIsReseting(true);

            sidebarref.current.style.width = "0";
            navbarref.current.style.setProperty("width", "100%");
            navbarref.current.style.setProperty("left", "0");

            setTimeout(() => setIsReseting(false), 300);
        }
    };

    const handleCreate = async () => {
        const promise = createDocument({
            title: "Sans titre",
            parentDocumentId: null
        }).then((data) => {
            navigate(`/documents/${data}`);
        }).catch((error) => {
            console.error("Error creating document:", error);
        });


        toast.promise(promise, {
            loading: "Creating document...",
            success: "Document created",
            error: "Error creating document",
            style: {
                background: resolvedTheme === "dark" ? "#333" : "#fff",
                color: resolvedTheme === "dark" ? "#fff" : "#000",
            }
        });
    };

    return (
        <>
            <aside
                ref={sidebarref}
                className={cn(
                    "group/sidebar h-full bottom-0 overflow-hidden overflow-y-auto relative flex w-60 flex-col z-[99990]",
                    isReseting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}
            >
                <div onClick={collapse} role="button" className={cn(
                    "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-5 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                    isMobile && "opacity-100"
                )}>
                    <ChevronsLeft className="w-6 h-6" />
                </div>
                <div className="flex flex-col p-4 px-[8px] items-center">
                    <UserItem />
                    <Item
                        label="Search"
                        icon={Search}
                        isSearch
                        onClick={search.onOpen}
                    />
                    <Item
                        label="Settings"
                        icon={Settings}
                        onClick={settings.onOpen}
                    />
                    <Item
                        label="Home"
                        icon={Home}
                        onClick={() => navigate("/documents")}
                    />
                    {(user?.role === "ADMIN" || user?.role === "OWNER") && (
                        <Item
                            onClick={panel.onOpen}
                            label="Panel Admin"
                            icon={Shield}
                        />
                    )}
                </div>
                <div className="flex flex-col gap-1 m-4 mx-2 ">
                    {haveFavorites && (
                        <div>
                            <h1 className='w-full flex text-[0.8rem] pt-4 justify-start ml-4 text-muted-foreground'>Favorites</h1>
                            <FavoriteList parentFavoriteId={"null"} />
                        </div>
                    )}

                    <div>
                        <h1 className='w-full flex text-[0.8rem] pt-4 mb-1 justify-start ml-4 text-muted-foreground'>Documents</h1>
                        <DocumentList parentDocumentId={"null"} />
                        <Item
                            onClick={handleCreate}
                            icon={PlusCircle}
                            label="Add a page"
                        />
                    </div>
                    <div>
                        <Popover>
                            <h1 className='w-full flex text-[0.8rem] justify-start ml-4 mt-4 text-muted-foreground'>Tools</h1>
                            <PopoverTrigger
                                className="w-full mt-[0.25rem] mb-4"
                            >
                                <Item label="Archived" icon={Trash} />
                            </PopoverTrigger>
                            <PopoverContent
                                className="p-2 w-72"
                                style={{ boxShadow: "rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px" }}
                                side={isMobile ? "bottom" : "right"}
                                align='start'
                            >
                                <TrashBox />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div onMouseDown={handleMouseDown} onClick={resetWidth} className="absolute top-0 right-0 w-1 h-full transition opacity-0 group-hover/sidebar:opacity-100 cursor-ew-resize bg-primary/10" />
            </aside>

            <div
                ref={navbarref}
                className={cn(
                    "fixed top-3 z-[99990] left-60 w-[calc(100%-240px)]",
                    isReseting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full",
                    // !!params.documentId ? "top-0" : "top-3"
                )}>
                {!!params.documentId ? (
                    <Navbar
                        isCollapsed={isCollapsed}
                        onResetWidth={resetWidth}
                        documentId={params.documentId}
                    />
                ) : (
                    <nav className={cn(isCollapsed ? "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-600 mx-3 my-2" : "hidden")}>
                        {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="w-6 h-6 text-muted-foreground" />}
                    </nav>
                )}
            </div>
        </>
    );
}