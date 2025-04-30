import { useState, useEffect } from "react";

export const useScrollTop = (treshold = 10) => {
    const [scrolled, setScrollTop] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > treshold) {
                setScrollTop(true);
            } else {
                setScrollTop(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); ;
    }, [treshold]);

    return scrolled;
};