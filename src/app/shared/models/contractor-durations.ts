
 export class ContractorDurations {
    id: number;
    
	buildingNumber: string;
	offeringType: number;
	periodFrom: Date;
	periodTo: Date;
	reasonCode: number;
	extension: string;
	bidNumber: number;
	contractorCode: string;
	contractorName: string;
	engineerName: string;
	executionDuration: number;
	referencesName: string;
	engineerCode: string;
	siteDeliveryDate: Date;
	referenceCode: string;
	governorateName: string;
	supervisorEngineerCode: string;
	constructor(arg?: ContractorDurations) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
