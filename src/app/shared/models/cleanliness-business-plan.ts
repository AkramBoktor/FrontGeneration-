
 export class CleanlinessBusinessPlan {
    id: number;
    
	branch: number;
	year: Date;
	month: Date;
	beginningPlanDate: Date;
	endPlanDate: Date;
	target: string;
	constructor(arg?: CleanlinessBusinessPlan) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
