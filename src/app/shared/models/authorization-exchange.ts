
 export class AuthorizationExchange {
    id: number;
    
	exchangeStoreNumber: string;
	exchangeCode: number;
	exchangeNumber: number;
	exchangeDate: Date;
	itemNo: string;
	productName: string;
	type: number;
	status: number;
	quantity: number;
	price: number;
	exchangeAuthorizationNumber: number;
	constructor(arg?: AuthorizationExchange) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
