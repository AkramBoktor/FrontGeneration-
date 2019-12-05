
 export class ContractorDurations {
    id: number;
    
	buildingNumber: string;
	offeringType: number;
	periodFrom: Date;
	periodTo: Date;
	reasonCode: number;
	extension: string;
	bidNumber: string;
	contractorCode: string;
	contractorName: string;
	engineerName: string;
	executionDuration: string;
	referencesName: string;
	engineerCode: string;
	siteDeliveryDate: Date;
	referenceCode: string;
	governorateName: number;
	constructor(arg?: ContractorDurations) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
