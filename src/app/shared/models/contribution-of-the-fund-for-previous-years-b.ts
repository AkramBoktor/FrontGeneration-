
 export class ContributionOfTheFundForPreviousYearsB {
    id: number;
    
	registrationPrice: number;
	subscriptionYear: string;
	membershipNumber: number;
	joinDate: Date;
	subscriptionStatus: number;
	employeeCode: string;
	constructor(arg?: ContributionOfTheFundForPreviousYearsB) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
