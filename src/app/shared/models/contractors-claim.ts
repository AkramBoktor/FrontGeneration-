
 export class ContractorsClaim {
    id: number;
    
	areaCode: number;
	claimCode: string;
	schoolNumber: number;
	bidNumber: number;
	offeringType: number;
	workType: number;
	contractorName: string;
	siteDeliveryDate: Date;
	claimType: number;
	executionDuration: Date;
	claimDate: Date;
	supervisingEngineer: string;
	constructor(arg?: ContractorsClaim) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
