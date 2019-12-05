
 export class FiveYearPlan {
    id: number;
    
	fiveYearplan: string;
	startYear: Date;
	endYear: Date;
	projectsNumber: number;
	actualProjectsNumber: number;
	suggestedValue: string;
	creditValue: string;
	constructor(arg?: FiveYearPlan) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
