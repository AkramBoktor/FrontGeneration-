
 export class InternalInvestigations {
    id: number;
    
	fileNumber: string;
	branchCode: number;
	actionCode: number;
	referralFrom: number;
	investigatedReferralDate: Date;
	lawyerCode: string;
	investigationSubject: string;
	referralInvestigationsDate: Date;
	attorneyReceiptDate: Date;
	investigationDocumentExpiryDate: Date;
	violationCode: number;
	category: number;
	competentAuthorityDate: Date;
	centralAgencyInvestigationSubmittedDate: Date;
	centralAgencyReplyDate: Date;
	savedFileDate: Date;
	employeeCode: string;
	employeeName: string;
	constructor(arg?: InternalInvestigations) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
