
 export class EmployeeEducationalQualifications {
    id: number;
    
	employeeCode: string;
	qualification: number;
	qualificationDate: Date;
	qualificationGrantSite: number;
	constructor(arg?: EmployeeEducationalQualifications) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
