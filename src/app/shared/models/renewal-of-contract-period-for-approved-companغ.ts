
 export class RenewalOfContractPeriodForApprovedCompanغ {
    id: number;
    
	companyCode: string;
	contractStartingDate: Date;
	contractEndDate: Date;
	constructor(arg?: RenewalOfContractPeriodForApprovedCompanغ) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
