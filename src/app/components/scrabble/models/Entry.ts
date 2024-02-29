export class Entry {

    public word: string;
    public y: number;
    public x: number;
    public vertical: boolean;
    public conflict: boolean;

    
	constructor(word: string, y: number, x: number, vertical: boolean) {
        this.word = word;
        this.y = y;
        this.x = x;
        this.vertical = vertical;
        this.conflict = false;
	}

    public lastX(): number {
        if (this.vertical)
            return this.x;

        return this.x + this.word.length - 1;
    }

    public lastY(): number {
        if (!this.vertical)
            return this.y;

        return this.y + this.word.length - 1;
    }

    public coords(): number[][] {
        const coords: number[][] = [];
        let i = 0;
        let j = 0;

        while (this.x + i <= this.lastX() && this.y + j <= this.lastY()) {
            coords.push([this.y + j, this.x + i]);
            this.vertical ? j++ : i++;
        }

        return coords;
    }

    public isSelected([y, x]: number[], vertical: boolean): boolean {
        return (
            this.vertical === vertical &&
            this.y <= y && y <= this.lastY() &&
            this.x <= x && x <= this.lastX()   
        );
    }

    public letterConflicts(entry: Entry|null): number[][] {
        const coords: number[][] = []

        if (entry) {
            this.word.split("").forEach((char, i) => {   
                const y = this.vertical ? this.y + i : this.y;
                const x = this.vertical ? this.x : this.x + i;
                const letterAtCoord = entry.letterAtCoord([y, x]);

                if (letterAtCoord && letterAtCoord !== char)
                    coords.push([y, x])
            })
        }

        return coords
    }

    public letterAtCoord([y, x]: number[]): string|null {
        if (this.vertical && this.x === x)
            return this.word.charAt(y - this.y) || null;
        else if (!this.vertical && this.y === y)
            return this.word.charAt(x - this.x) || null;
        else 
            return null;
    }

    public eraseLetterArCoord([y, x]: number[]): void {
        const letters: string[] = this.word.split("")
        
        if (this.x === x && this.y === y) {
            letters.splice(0, 1);
            this.vertical ? this.y += 1 : this.x += 1
        } else if (this.lastX() === x && this.lastY() === y) {
            letters.splice(-1, 1);
        }
        
        if (letters.length < 2)
            this.word = "";
        else
            this.word = letters.join("");
    }

    public writeWordOnGrid(grid: string[][]): void {
        const chars: string[] = this.word.split("")
        let y = this.y;
        let x = this.x;

        if (this.vertical && this.lastY() < grid.length)
            chars.forEach(char => grid[y++][x] = char)
        else if (!this.vertical && this.lastX() < grid.length)
            chars.forEach(char => grid[y][x++] = char)
    }

    public equals(entry: Entry): boolean {
        return (
            this.vertical === entry.vertical &&
            this.x === entry.x &&
            this.y === entry.y
        )
    }
}