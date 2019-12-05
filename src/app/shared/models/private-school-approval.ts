
 export class PrivateSchoolApproval {
    id: number;
    
	governorate: number;
	complementarySchoolCode: string;
	schoolCode: string;
	qualityCode: number;
	approvalDate: Date;
	approvalNumber: string;
	approvalPosition: number;
	approvalType: string;
	notes: string;
	generalSiteManager: string;
	accreditationBody: string;
	schoolDependency: number;
	phaseCode: number;
	classesNumber: string;
	studentDensity: string;
	totalCapacity: string;
	constructor(arg?: PrivateSchoolApproval) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
