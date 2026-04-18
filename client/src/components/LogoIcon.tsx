import React from "react";

export function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M 31 78 L 31 33 C 8 43 8 68 19 78 Z" />
            <path d="M 34 78 L 34 23 C 53 23 68 31 72 44 L 38 78 Z" />
            <path d="M 41 78 L 69 50 C 81 55 87 69 83 78 Z" />
        </svg>
    );
}
