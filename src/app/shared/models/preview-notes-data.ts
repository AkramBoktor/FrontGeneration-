
 export class PreviewNotesData {
    id: number;
    
	landID: string;
	borderCode: number;
	dimension: string;
	insideOutsideSite: number;
	constructor(arg?: PreviewNotesData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
