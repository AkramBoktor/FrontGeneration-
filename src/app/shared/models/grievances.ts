
 export class Grievances {
    id: number;
    
	fileNumber: string;
	grievanceDestinationCode: number;
	employeeCode: string;
	branchCode: number;
	investigationFileNumber: string;
	executiveOrderNumber: string;
	issuanceExecutiveOrderDate: Date;
	grievanceSubject: string;
	executiveOrderNewNo: string;
	executiveOrderNewDate: Date;
	containedArchiveDate: Date;
	incomingNumber: string;
	receivedDate: Date;
	lawyerCode: string;
	referralDate: Date;
	grievanceSearchHistory: Date;
	grievanceSearchResult: string;
	presentationChairmanCommissionDate: Date;
	decisionChairmanCommission: number;
	penaltyAfterAmendment: number;
	chairmanDecisionDate: Date;
	notificationAffairsDate: Date;
	complainantDateNotification: Date;
	savedTopicDate: Date;
	constructor(arg?: Grievances) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
