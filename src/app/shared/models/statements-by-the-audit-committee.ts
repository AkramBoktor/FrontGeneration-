
 export class StatementsByTheAuditCommittee {
    id: number;
    
	landID: string;
	committeeNumber: string;
	reviewNoteCode: string;
	constructor(arg?: StatementsByTheAuditCommittee) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
