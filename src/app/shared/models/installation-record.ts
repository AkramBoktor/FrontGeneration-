
 export class InstallationRecord {
    id: number;
    
	employeeCode: string;
	itemNo: string;
	storeNumber: string;
	itemCondition: number;
	exchangeAuthorizationNumber: string;
	exchangeDate: Date;
	quantityExchange: string;
	recordDate: Date;
	recordNumber: string;
	installationPlace: string;
	constructor(arg?: InstallationRecord) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
