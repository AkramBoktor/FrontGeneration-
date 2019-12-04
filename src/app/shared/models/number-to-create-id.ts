
 export class NumberToCreateID {
    id: number;
    
	number: string;
	checkDigit: string;
	constructor(arg?: NumberToCreateID) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
