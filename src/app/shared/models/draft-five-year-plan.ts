
 export class DraftFiveYearPlan {
    id: number;
    
	fiveYearPlanNumber: number;
	projectNumber: string;
	planningProjectNumberMinistry: string;
	projectName: string;
	projectType: number;
	educationallevel: number;
	suggestedValue: string;
	creditValue: string;
	schoolsNumber: string;
	classesNumber: string;
	constructor(arg?: DraftFiveYearPlan) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
