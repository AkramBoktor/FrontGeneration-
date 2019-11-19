
 export class CanceledTender {
    id: number;
    
	offeringType: number;
	bidNumber: number;
	tenderNumber: number;
	contractorCode: string;
	schoolNumber: number;
	schoolName: string;
	exclusionReason: string;
	constructor(arg?: CanceledTender) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
