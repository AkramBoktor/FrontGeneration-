
 export class DraftAnnualPlan {
    id: number;
    
	suggestedValue: string;
	creditValue: string;
	classesNumber: string;
	schoolsNumber: string;
	yearPlan: Date;
	annualProjectPlanCode: number;
	fivePlanProjectCode: number;
	accreditationAfterAmendment: string;
	constructor(arg?: DraftAnnualPlan) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
