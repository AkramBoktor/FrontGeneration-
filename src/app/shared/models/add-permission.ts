
 export class AddPermission {
    id: number;
    
	recipientStoreNumber: string;
	bondCode: number;
	bondNo: number;
	billNumber: string;
	addPermissionNumber: string;
	dateOfSupply: Date;
	itemNo: string;
	productName: string;
	type: number;
	condition: number;
	quantityBalance: number;
	price: number;
	value: string;
	constructor(arg?: AddPermission) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
