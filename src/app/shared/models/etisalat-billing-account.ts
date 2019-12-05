
 export class EtisalatBillingAccount {
    id: number;
    
	monthDebt: Date;
	periodOf: Date;
	periodTo: Date;
	employeeCode: string;
	constructor(arg?: EtisalatBillingAccount) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
