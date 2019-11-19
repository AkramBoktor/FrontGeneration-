
 export class MembershipData {
    id: number;
    
	employeeCode: string;
	job: string;
	iDNumber: string;
	residence: string;
	sharesNumber: string;
	membershipNumber: string;
	membershipDate: Date;
	profitAmount: string;
	constructor(arg?: MembershipData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
