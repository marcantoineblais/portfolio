import { ReactNode } from "react";

export class MainComponent {
  constructor(
    public name: string,
    public opacity: number,
    public start: number,
    public center: number,
    public end: number,
    public isRendered: boolean,
    public setOpacity: (opacity: number) => void,
    public setStart: (start: number) => void,
    public setCenter: (center: number) => void,
    public setEnd: (end: number) => void,
    public setIsRendered: (isRendered: boolean) => void,
    public component: ReactNode,
  ) {}
}
