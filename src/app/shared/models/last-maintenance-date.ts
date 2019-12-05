
 export class LastMaintenanceDate {
    id: number;
    
	buildingType: number;
	equipmentGroup: number;
	equipmentType: number;
	equipmentNumber: string;
	mainMaintenanceItem: string;
	lastDateMaintenance: Date;
	constructor(arg?: LastMaintenanceDate) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
