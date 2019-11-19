
 export class ReturnOfCustodyOfAnEmployee {
    id: number;
    
	storeNumber: string;
	employeeCode: string;
	itemNo: number;
	itemCondition: number;
	authorizationNumber: number;
	exchangeDate: Date;
	quantityExchange: number;
	returnDate: Date;
	addPermissionNumber: string;
	returnQuantity: number;
	itemCode: string;
	productName: string;
	quantity: number;
	price: number;
	constructor(arg?: ReturnOfCustodyOfAnEmployee) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
