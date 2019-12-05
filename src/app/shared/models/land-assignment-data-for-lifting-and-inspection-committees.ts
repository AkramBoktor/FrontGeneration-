
 export class LandAssignmentDataForLiftingAndInspectionCommittees {
    id: number;
    
	committeeType: number;
	formationDate: Date;
	committeeNumber: string;
	landNumber: string;
	landName: string;
	referenceDate: Date;
	constructor(arg?: LandAssignmentDataForLiftingAndInspectionCommittees) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
