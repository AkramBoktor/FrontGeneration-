
 export class SocialSecurityForEmployeeFamily {
    id: number;
    
	individualSerial: number;
	relationship: number;
	employeeName: string;
	employeeCode: string;
	insuranceNumber: string;
	constructor(arg?: SocialSecurityForEmployeeFamily) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
