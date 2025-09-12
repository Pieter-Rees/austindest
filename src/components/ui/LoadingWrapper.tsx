"use client";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface LoadingWrapperProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export const LoadingWrapper = ({
    children,
    fallback = null
}: LoadingWrapperProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return isLoaded ? <>{children}</> : <>{fallback}</>;
};
