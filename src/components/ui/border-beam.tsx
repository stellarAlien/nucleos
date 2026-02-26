"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    size?: number;
    duration?: number;
    anchor?: number;
    borderWidth?: number;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
    reverse?: boolean;
}

export const BorderBeam = React.forwardRef<HTMLDivElement, BorderBeamProps>(
    (
        {
            className,
            size = 100,
            duration = 8,
            anchor = 90,
            borderWidth = 1.5,
            colorFrom = "#5DBB8A",
            colorTo = "#D4E79E",
            delay = 0,
            reverse = false,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                style={
                    {
                        "--size": size,
                        "--duration": `${duration}s`,
                        "--anchor": `${anchor}%`,
                        "--border-width": `${borderWidth}px`,
                        "--color-from": colorFrom,
                        "--color-to": colorTo,
                        "--delay": `${delay}s`,
                    } as React.CSSProperties
                }
                className={cn(
                    "pointer-events-none absolute inset-0 rounded-[inherit] border-[var(--border-width)_solid_transparent]",
                    // Beam gradient that moves
                    "bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)] bg-[length:200%_auto] bg-clip-border",
                    // Mask to confine to border only
                    "mask-clip: border-box",
                    "mask-composite: exclude",
                    "mask-image: linear-gradient(black, black), linear-gradient(black, black)",
                    "animate-border-beam",
                    reverse && "animate-[border-beam-reverse_var(--duration)_linear_var(--delay)_infinite]",
                    className
                )}
                {...props}
            />
        );
    }
);

BorderBeam.displayName = "BorderBeam";