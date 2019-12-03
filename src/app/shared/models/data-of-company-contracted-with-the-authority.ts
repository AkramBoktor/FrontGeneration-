
 export class DataOfCompanyContractedWithTheAuthority {
    id: number;
    
	companyCode: string;
	companyName: string;
	companyAddress: string;
	companyTelephon: string;
	mainActivity: number;
	shopNumber: string;
	fileNumber: string;
	taxCardNumber: string;
	mamoriaTax: number;
	companyPresenter: string;
	adjective: number;
	contractStartingDate: Date;
	contractEndingDate: Date;
	mainBranchCode: number;
	constructor(arg?: DataOfCompanyContractedWithTheAuthority) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
