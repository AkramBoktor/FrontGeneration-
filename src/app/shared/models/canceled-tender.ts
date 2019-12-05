
 export class CanceledTender {
    id: number;
    
	offeringType: number;
	bidNumber: string;
	tenderNumber: string;
	contractorCode: string;
	schoolNumber: string;
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
