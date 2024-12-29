import React from "react"

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

export const Navbar = ( {
    isCollapsed,
    onResetWidth
}: NavbarProps) => {
    return (
        <div>
            NavBar
        </div>
    )
}