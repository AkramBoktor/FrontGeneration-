
 export class Supply {
    id: number;
    
	valueNumber: string;
	valueDate: Date;
	valueAmount: number;
	from: Date;
	to: Date;
	constructor(arg?: Supply) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
