
 export class AssigningTheCaseToANewLawyer {
    id: number;
    
	branchCode: number;
	fileNumber: string;
	entityType: number;
	issueCode: number;
	lawsuitNumber: string;
	year: Date;
	incomingDate: Date;
	employeeCode: string;
	receiptAttorneyDate: Date;
	constructor(arg?: AssigningTheCaseToANewLawyer) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
