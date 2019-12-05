
 export class LinkThePlanSourceToTheBudgetSource {
    id: number;
    
	yearPlan: Date;
	fundingSourceCode: number;
	budgetSourceCode: number;
	constructor(arg?: LinkThePlanSourceToTheBudgetSource) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
