
 export class Promotion {
    id: number;
    
	employeeCode: string;
	financialDegree: number;
	promotionDate: Date;
	jobTitle: number;
	jobDate: Date;
	preFinancialDegree: number;
	previousJobTitle: number;
	previousJobDate: Date;
	constructor(arg?: Promotion) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
