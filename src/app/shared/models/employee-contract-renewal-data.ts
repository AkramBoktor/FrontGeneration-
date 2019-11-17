
 export class EmployeeContractRenewalData {
    id: number;
    
	employeeCode: string;
	centralAdministration: number;
	subAdministration: number;
	jobTitle: number;
	financialDegree: number;
	receiptDate: Date;
	renewalType: number;
	startRenewalDate: Date;
	renewalPeriod: string;
	prePeriodNumber: string;
	prePeriodStartingDate: Date;
	prePeriodEndDate: Date;
	durationPeriod: string;
	newPeriodNumber: string;
	periodEndDate: Date;
	contractAmount: string;
	constructor(arg?: EmployeeContractRenewalData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
