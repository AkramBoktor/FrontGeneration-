
 export class ExaminationCommitteeMemberData {
    id: number;
    
	offeringType: number;
	bidNumber: number;
	meetingNumber: number;
	serialMember: number;
	memberType: number;
	memberName: string;
	constructor(arg?: ExaminationCommitteeMemberData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
