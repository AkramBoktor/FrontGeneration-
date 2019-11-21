
 export class EnterTheTelephoneBill {
    id: number;
    
	employeeCode: string;
	admistrationCode: number;
	phoneNumber: string;
	constructor(arg?: EnterTheTelephoneBill) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
