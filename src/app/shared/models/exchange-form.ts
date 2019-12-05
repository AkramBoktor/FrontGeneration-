
 export class ExchangeForm {
    id: number;
    
	zipCode: number;
	formNumber: string;
	formDate: Date;
	formAmount: string;
	formStatement: string;
	schoolNumber: string;
	schoolName: string;
	amount: string;
	total: string;
	constructor(arg?: ExchangeForm) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
