import { MouseEventHandler } from "react";

export default function Arrow(
    { reversed, className, action, visible }:
    { reversed: boolean, className: string, action: MouseEventHandler<HTMLDivElement>, visible: boolean }
) {
    return (
        <div onClick={action} className={`${className} ${visible ? "" : "invisible"}`}>
            <svg className={reversed ? "rotate-180" : ""} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                <path fill="currentColor" d="M480.27,243.82,288.05,123.31a4.78,4.78,0,0,0-7.32,4v241a4.78,4.78,0,0,0,7.32,4.05L480.27,251.92A4.78,4.78,0,0,0,480.27,243.82Z"/>
                <path fill="currentColor" d="M287.55,298.87H39.66a4.06,4.06,0,0,1-4.11-4v-94a4.06,4.06,0,0,1,4.11-4H287.55Z"/>
            </svg>
        </div>
    )
}