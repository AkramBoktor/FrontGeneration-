
 export class PrintMaintenanceIndexationBuilding {
    id: number;
    
	buildingCode: string;
	yearPlan: Date;
	maintenanceType: number;
	printType: boolean;
	constructor(arg?: PrintMaintenanceIndexationBuilding) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
