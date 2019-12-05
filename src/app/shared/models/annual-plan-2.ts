
 export class AnnualPlan2 {
    id: number;
    
	fiveYearplanNumber: number;
	projectsNumber: number;
	pLanYear: Date;
	yearplanNumber: number;
	constructor(arg?: AnnualPlan2) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
