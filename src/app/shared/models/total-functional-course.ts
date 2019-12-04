
 export class TotalFunctionalCourse {
    id: number;
    
	branchCode: number;
	jobCode: number;
	total: string;
	fixed: string;
	variable: string;
	constructor(arg?: TotalFunctionalCourse) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
