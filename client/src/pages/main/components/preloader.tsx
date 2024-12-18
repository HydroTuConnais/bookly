import React from "react";
import "../style/preloader.css";

export const Preloader = () => {
    return (
        <div className="preloader z-[9999]">
            <div className="texts-container gap-2">
                <span>Welcome to,</span>
                <span>Notion Lite</span>
            </div>
        </div>
    );
}