
 export class SanctionsFund {
    id: number;
    
	employeeCode: string;
	demandDate: Date;
	deathCode: number;
	deathDate: Date;
	amount: string;
	dietName: string;
	receiverName: string;
	constructor(arg?: SanctionsFund) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
