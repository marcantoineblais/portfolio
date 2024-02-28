import React, { ReactNode } from "react";

export default function ConditionalDiv(
    { children, className = "", visible }: 
    { children: ReactNode, className?: string, visible: boolean }
) {

    const [display, setDisplay] = React.useState<string>("invisible")
    
    React.useEffect(() => {
        if (visible)
            setDisplay("")
        else
            setDisplay("!hidden")
    }, [visible])

    return (
        <div className={className + " " + display}>
            { children }
        </div>
    )
}