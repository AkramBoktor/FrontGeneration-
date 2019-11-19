
 export class AddCashToAStore {
    id: number;
    
	employeeCode: string;
	receiptNumber: string;
	itemNo: string;
	productName: string;
	type: number;
	condition: number;
	quantity: number;
	price: number;
	value: number;
	receiptDate: Date;
	missingQuantity: number;
	constructor(arg?: AddCashToAStore) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
