
 export class IndexationBuildingMaintenance {
    id: number;
    
	buildingCode: string;
	yearPlan: Date;
	maintenanceType: number;
	yearPricing: Date;
	employmentType: number;
	extensionCode: number;
	floorNumber: string;
	spaceCode: number;
	itemCode: string;
	itemName: string;
	quantity: string;
	price: string;
	constructor(arg?: IndexationBuildingMaintenance) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
