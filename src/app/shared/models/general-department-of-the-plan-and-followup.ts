
 export class GeneralDepartmentOfThePlanAndFollowup {
    id: number;
    
	governorateCode: number;
	yearPlan: Date;
	projectode: number;
	componentCode: number;
	sourceCode: string;
	creditValue: string;
	constructor(arg?: GeneralDepartmentOfThePlanAndFollowup) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
