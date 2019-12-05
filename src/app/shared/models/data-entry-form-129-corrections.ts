
 export class DataEntryForm129Corrections {
    id: number;
    
	correctionNumber: string;
	month: Date;
	incomingNumber: string;
	constructor(arg?: DataEntryForm129Corrections) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
