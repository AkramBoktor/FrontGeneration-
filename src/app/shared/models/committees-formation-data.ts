
 export class CommitteesFormationData {
    id: number;
    
	formationDate: Date;
	committeeTypeCode: number;
	committeeNumber: string;
	committeeMemberNumber: string;
	constructor(arg?: CommitteesFormationData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
