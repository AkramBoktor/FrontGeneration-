
 export class ExaminationCommitteeDateData {
    id: number;
    
	offeringType: number;
	bidNumber: string;
	meetingNumber: number;
	committeeDate: Date;
	committeeHeadquarters: string;
	approvalFormationDate: Date;
	offeringProcedures: string;
	constructor(arg?: ExaminationCommitteeDateData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
