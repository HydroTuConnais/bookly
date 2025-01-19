import React, { createContext, useContext, useState, useEffect } from "react";
import { preLoaderAnim } from "@/pages/documents/components/animation";

interface AnimationContextProps {
    isAnimationFinished: boolean;
}

const AnimationContext = createContext<AnimationContextProps | undefined>(undefined);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);

    useEffect(() => {
        preLoaderAnim(() => {
            setIsAnimationFinished(true);
        });

        return () => {
            setIsAnimationFinished(false); // Reset the animation state
        };
    }, []);

    return (
        <AnimationContext.Provider value={{ isAnimationFinished }}>
            {children}
        </AnimationContext.Provider>
    );
};

export const useAnimation = () => {
    const context = useContext(AnimationContext);
    if (context === undefined) {
        throw new Error("useAnimation must be used within an AnimationProvider");
    }
    return context;
};