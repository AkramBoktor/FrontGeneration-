
 export class TheSourceOfFundingForAnAnnualPlanProjectComponent {
    id: number;
    
	suggesteValue: string;
	sourceCode: string;
	yearPlan: Date;
	projectPlanCode: number;
	componentCode: number;
	accreditationAfterAmendment: string;
	creditValue: string;
	constructor(arg?: TheSourceOfFundingForAnAnnualPlanProjectComponent) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
