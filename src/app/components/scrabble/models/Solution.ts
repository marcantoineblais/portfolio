import { Entry } from "./Entry";

export class Solution {
    public entry: Entry;
    public points: number;
    public blankTiles: number[];

    constructor(entry: Entry, points: number, blankTiles: number[]) {
        this.entry = entry;
        this.points = points;
        this.blankTiles = blankTiles;
    }

    isLetterBlank([y, x]: number[]): boolean {
        const index = this.entry.vertical ? y - this.entry.y : x - this.entry.x;

        return this.blankTiles.some((tile: number) => tile === index)
    }
}