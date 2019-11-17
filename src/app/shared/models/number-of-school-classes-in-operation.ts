
 export class NumberOfSchoolClassesInOperation {
    id: number;
    
	branchCode: number;
	projectCode: string;
	classesNumber: number;
	constructor(arg?: NumberOfSchoolClassesInOperation) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
