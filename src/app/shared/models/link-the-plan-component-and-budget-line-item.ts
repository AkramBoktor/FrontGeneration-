
 export class LinkThePlanComponentAndBudgetLineItem {
    id: number;
    
	yearPlan: Date;
	projectNumber: number;
	componentCode: number;
	budgetYear: Date;
	budgetItemCode: number;
	constructor(arg?: LinkThePlanComponentAndBudgetLineItem) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
