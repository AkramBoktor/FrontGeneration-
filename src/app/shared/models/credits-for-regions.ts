
 export class CreditsForRegions {
    id: number;
    
	areaCode: number;
	budgetYear: string;
	budgetItem: number;
	fundingSourceNumber: number;
    regionApprovedAmount: string;

	constructor(arg?: CreditsForRegions) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
