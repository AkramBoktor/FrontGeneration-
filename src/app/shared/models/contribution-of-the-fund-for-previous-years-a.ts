
 export class ContributionOfTheFundForPreviousYearsA {
    id: number;
    
	employeeCode: string;
	subscriptionStatus: number;
	joinDate: Date;
	membershipNumber: number;
	subscriptionYear: string;
	registrationPrice: number;
	constructor(arg?: ContributionOfTheFundForPreviousYearsA) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
