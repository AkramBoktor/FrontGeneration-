
 export class TransferHisCustodyEmployeeToAnother {
    id: number;
    
	carrierEmployeeNumber: string;
	recipientEmployeeNumber: string;
	itemNo: string;
	itemCondition: number;
	lastPrice: number;
	storeNumber: string;
	exchangeAuthorizationNumber: string;
	exchangeDate: Date;
	quantity: number;
	transferDate: Date;
	quantityTransferred: number;
	constructor(arg?: TransferHisCustodyEmployeeToAnother) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
