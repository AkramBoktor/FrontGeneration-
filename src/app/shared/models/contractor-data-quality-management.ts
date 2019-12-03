
 export class ContractorDataQualityManagement {
    id: number;
    
	contractorCode: string;
	contractorName: string;
	constructor(arg?: ContractorDataQualityManagement) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
