
 export class ElectronicPaymentForm {
    id: number;
    
	form55Date: Date;
	areaNumber: number;
	form55Number: string;
	paidType: number;
	constructor(arg?: ElectronicPaymentForm) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
