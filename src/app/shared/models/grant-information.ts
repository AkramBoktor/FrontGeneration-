
 export class GrantInformation {
    id: number;
    
	grantCode: string;
	grantName: string;
	entityCode: string;
	offeringType: number;
	schoolNumber: number;
	contributionRatio: string;
	grantStartdate: Date;
	grantEndDate: Date;
	totalAmount: number;
	constructor(arg?: GrantInformation) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
