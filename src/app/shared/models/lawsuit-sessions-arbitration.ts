
 export class LawsuitSessionsArbitration {
    id: number;
    
	branchCode: number;
	fileNumber: string;
	entityType: number;
	arbitrationNumber: string;
	year: Date;
	arbitrationCode: number;
	whoIs: number;
	arbitrationClassification: number;
	discountType: number;
	code: number;
	arbitrationText: number;
	arbitrator: number;
	technicalMember: number;
	legalMember: number;
	sessionDate: Date;
	constructor(arg?: LawsuitSessionsArbitration) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
