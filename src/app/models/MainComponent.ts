import { ReactNode } from "react"

export class MainComponent {
    constructor(
        public name: string,
        public opacity: number,
        public start: number,
        public center: number,
        public end: number,
        public isRendered: boolean,
        public setOpacity: Function,
        public setStart: Function,
        public setCenter: Function,
        public setEnd: Function,
        public setIsRendered: Function,
        public component: ReactNode
    ) {}
}