
 export class DeliveryWarehousesToKeepers {
    id: number;
    
	storeNumber: string;
	currentStorekeeper: string;
	receivedDate: Date;
	employeeCode: string;
	deliveryDate: Date;
	constructor(arg?: DeliveryWarehousesToKeepers) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
