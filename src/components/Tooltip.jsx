export function Tooltip({ children, text, position = "bottom" }) {
    const positionClasses = position === "bottom"
        ? "bottom-full mb-1"
        : "top-full mt-1"

    return (
        <div className="relative group z-50">
            {children}
            <div
                className={`absolute left-1/2 transform -translate-x-1/2 ${positionClasses} w-max max-w-xs p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                {text}
            </div>
        </div>
    )
}