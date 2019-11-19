
 export class OralInvestigations {
    id: number;
    
	branchCode: number;
	investigationFileNumber: string;
	lawyerPenaltyCode: string;
	violationCode: number;
	punishmentDate: Date;
	executiveOrderNumber: string;
	issuanceExecutiveOrderDate: Date;
	employeeCode: string;
	employeeName: string;
	punishment: number;
	constructor(arg?: OralInvestigations) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
