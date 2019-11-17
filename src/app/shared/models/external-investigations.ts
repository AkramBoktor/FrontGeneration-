
 export class ExternalInvestigations {
    id: number;
    
	fileNumber: string;
	branchCode: number;
	actionCode: number;
	referralFrom: number;
	investigatedReferralDate: Date;
	lawyerCode: string;
	investigationSubject: string;
	caseNumber: string;
	receivedDate: Date;
	prosecutionDocumentReviewDate: Date;
	submissionCompetentDate: Date;
	violationCode: number;
	category: number;
	competentAuthorityDate: Date;
	centralAgencyInvestigationSubmittedDate: Date;
	centralAgencyReplyDate: Date;
	savedFileDate: Date;
	employeeCode: string;
	employeeName: string;
	constructor(arg?: ExternalInvestigations) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
