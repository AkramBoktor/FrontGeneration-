
 export class AssignEngineerOutsideDepartment {
    id: number;
    
	branchCode: number;
	executiveEngineerNumber: string;
	schoolNumber: string;
	atthchEnginnerNumber: string;
	yearPlan: Date;
	constructionType: number;
	bidNumber: string;
	offeringType: number;
	supervisionBeginningDate: Date;
	type: number;
	constructor(arg?: AssignEngineerOutsideDepartment) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
