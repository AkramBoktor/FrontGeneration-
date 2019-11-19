
 export class SalesForms {
    id: number;
    
	schoolNumber: number;
	typeOfForm: number;
	formNumber: string;
	nameOfTheOwner: string;
	famousForNumber: string;
	date: Date;
	space: number;
	theValue: number;
	constructor(arg?: SalesForms) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
