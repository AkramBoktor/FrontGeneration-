
 export class EmployeeExperience {
    id: number;
    
	experienceStartDate: Date;
	experienceEndDate: Date;
	experienceEntity: string;
	experienceType: number;
	leavingServiceReason: number;
	financialDegree: number;
	jobTitle: number;
	unionMembershipDate: Date;
	employeeCode: string;
	constructor(arg?: EmployeeExperience) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
