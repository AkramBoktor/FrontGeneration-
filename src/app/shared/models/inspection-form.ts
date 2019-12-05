
 export class InspectionForm {
    id: number;
    
	branchCode: number;
	schoolNumber: string;
	administrationCode: number;
	inspectionDate: Date;
	schoolManger: string;
	managementEducationInspectionMember: string;
	directorEducationalAdministrationAccreditation: string;
	arealAdministrationAccreditation: string;
	constructor(arg?: InspectionForm) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
