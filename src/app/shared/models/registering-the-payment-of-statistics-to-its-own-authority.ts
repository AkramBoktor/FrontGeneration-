
 export class RegisteringThePaymentOfStatisticsToItsOwnAuthority {
    id: number;
    
	collectionNumber: string;
	collectionDate: number;
	collectionAmount: number;
	from: Date;
	to: Date;
	constructor(arg?: RegisteringThePaymentOfStatisticsToItsOwnAuthority) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
