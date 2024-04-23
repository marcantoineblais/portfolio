import React from "react";
import { MainComponent } from "../models/MainComponent";

export default function useMainComponent(name: string, createComponent: Function) {
    const [opacity, setOpacity] = React.useState<number>(0)
    const [start, setStart] = React.useState<number>(0)
    const [center, setCenter] = React.useState<number>(0)
    const [end, setEnd] = React.useState<number>(0)
    const [isRendered, setIsRendered] = React.useState<boolean>(false)
    const component = createComponent(name, opacity)

    return { 
        name, 
        opacity, 
        start, 
        center, 
        end, 
        isRendered, 
        setOpacity, 
        setStart, 
        setCenter, 
        setEnd, 
        setIsRendered,
        component 
    }
}