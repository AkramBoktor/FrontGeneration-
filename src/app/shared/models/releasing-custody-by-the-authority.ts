
 export class ReleasingCustodyByTheAuthority {
    id: number;
    
	employeeCode: string;
	authorityType: number;
	authorityCode: number;
	itemNo: string;
	itemCondition: number;
	lastPrice: number;
	storeNumber: number;
	exchangeAuthorizationNumber: number;
	exchangeDate: Date;
	quantity: number;
	projectionDate: Date;
	quantityRaised: number;
	constructor(arg?: ReleasingCustodyByTheAuthority) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
