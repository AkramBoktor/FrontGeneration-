
 export class EnvelopesOpennigCommetyData {
    id: number;
    
	offeringType: number;
	bidNumber: string;
	committeeDate: Date;
	committeeHeadquarters: string;
	offeringApprovalDate: Date;
	openingFinancialEnvelopesDate: Date;
	approvalFormationDate: Date;
	tenderPosition: string;
	constructor(arg?: EnvelopesOpennigCommetyData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
