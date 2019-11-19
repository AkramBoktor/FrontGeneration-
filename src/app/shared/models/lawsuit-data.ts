
 export class LawsuitData {
    id: number;
    
	branchCode: number;
	fileNumber: string;
	entityType: number;
	entityCode: number;
	whoIs: number;
	lawsuitPosition: number;
	lawsuitNumber: string;
	year: Date;
	issueCode: number;
	employeeCode: string;
	lawyerReceiptDate: Date;
	courtCode: number;
	chamberType: number;
	litigationDegree: number;
	incomingDate: Date;
	firstSessionDate: Date;
	constructor(arg?: LawsuitData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
