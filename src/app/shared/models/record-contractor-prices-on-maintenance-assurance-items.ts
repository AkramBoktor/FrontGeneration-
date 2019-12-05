
 export class RecordContractorPricesOnMaintenanceAssuranceItems {
    id: number;
    
	buildingCode: string;
	yearPlan: Date;
	maintenanceType: number;
	itemCode: string;
	itemName: string;
	price: string;
	quantity: string;
	constructor(arg?: RecordContractorPricesOnMaintenanceAssuranceItems) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
