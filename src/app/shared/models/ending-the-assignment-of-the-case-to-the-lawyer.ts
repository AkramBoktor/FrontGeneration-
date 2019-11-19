
 export class EndingTheAssignmentOfTheCaseToTheLawyer {
    id: number;
    
	branchCode: number;
	fileNumber: string;
	entityType: number;
	entityCode: number;
	issueCode: number;
	lawsuitNumber: string;
	year: Date;
	incomingDate: Date;
	employeeCode: string;
	directorAssignmentDate: Date;
	lawyerExpiryDate: Date;
	caseReason: number;
	constructor(arg?: EndingTheAssignmentOfTheCaseToTheLawyer) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
