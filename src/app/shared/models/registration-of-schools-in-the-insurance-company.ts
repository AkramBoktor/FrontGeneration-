
 export class RegistrationOfSchoolsInTheInsuranceCompany {
    id: number;
    
	companyCode: string;
	companyname: string;
	dateOfRegistration: Date;
	amountOfInsurance: number;
	buildingNumber: string;
	annexNumber: number;
	numberOfFloors: number;
	modelCode: string;
	classroomNumber: string;
	constructor(arg?: RegistrationOfSchoolsInTheInsuranceCompany) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
