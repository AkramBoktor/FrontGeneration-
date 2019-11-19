
 export class ContractorData {
    id: number;
    
	supplierCode: string;
	companyName: string;
	category: number;
	resourceType: number;
	ownerName: string;
	administratorName: string;
	resourceAddress: number;
	region: string;
	phoneNumber: string;
	managerCardCode: string;
	issuer: number;
	taxCardNumber: string;
	issuerOfTaxCard: number;
	recordType: number;
	constraintNumber: number;
	statement: number;
	blackList: number;
	constructor(arg?: ContractorData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
