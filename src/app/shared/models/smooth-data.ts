
 export class SmoothData {
    id: number;
    
	seriesCode: string;
	seriesTitle: string;
	bookNumber: string;
	bookTitle: string;
	constructor(arg?: SmoothData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
