
 export class DocumentData {
    id: number;
    
	landID: string;
	documentCode: number;
	documentStatusCode: number;
	attachment: string;
	constructor(arg?: DocumentData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
