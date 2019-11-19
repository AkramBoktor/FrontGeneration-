
 export class ExaminationCommitteeDateData {
    id: number;
    
	offeringType: number;
	bidNumber: number;
	meetingNumber: number;
	committeeDate: Date;
	committeeHeadquarters: number;
	approvalFormationDate: Date;
	offeringProcedures: number;
	constructor(arg?: ExaminationCommitteeDateData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
