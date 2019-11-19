
 export class InsuranceCompaniesCodes {
    id: number;
    
	companionsCode: string;
	companionsName: string;
	companyAddress: string;
	companyPhone: string;
	companyFax: string;
	constructor(arg?: InsuranceCompaniesCodes) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
