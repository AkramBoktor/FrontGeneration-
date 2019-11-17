
 export class SessionSubCodes {
    id: number;
    
	majorClassification: number;
	subcategory: number;
	courseName: string;
	constructor(arg?: SessionSubCodes) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
