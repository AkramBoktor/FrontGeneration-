
 export class FundStatistics {
    id: number;
    
	collectionNumber: string;
	collectionDate: Date;
	employeeCode: string;
	collectionType: number;
	from: Date;
	to: Date;
	amount: number;
	constructor(arg?: FundStatistics) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
