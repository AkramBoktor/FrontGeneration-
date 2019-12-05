
 export class EquipmentMaintenancePlanData {
    id: number;
    
	buildingType: number;
	equipmentGroup: number;
	equipmentType: number;
	equipmentNumber: string;
	mainMaintenanceItem: string;
	equipmentMaintenancePlanSerial: string;
	plannedMaintenanceDate: Date;
	actualMaintenanceDate: Date;
	maintenanceIndividual: string;
	maintenanceIndividualNumber: string;
	constructor(arg?: EquipmentMaintenancePlanData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
