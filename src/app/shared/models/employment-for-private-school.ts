
 export class EmploymentForPrivateSchool {
    id: number;
    
	schoolCode: string;
	approvalDate: Date;
	operationDate: Date;
	operationType: number;
	schoolDependency: number;
	phaseCode: number;
	notes: string;
	classesNumber: string;
	constructor(arg?: EmploymentForPrivateSchool) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
