import type { ReactNode } from "react";

interface EmbedContainerProps {
    children: ReactNode;
    className?: string;
    height?: string;
}

export const EmbedContainer = ({
    children,
    className = "",
    height = "auto"
}: EmbedContainerProps) => {
    return (
        <div
            className={`overflow-hidden rounded-lg fancy-border safari-fix ${className}`}
            style={{ height }}
        >
            {children}
        </div>
    );
};
