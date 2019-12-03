
 export class PeriodicMaintenanceData {
    id: number;
    
	buildingType: number;
	buildingCode: string;
	workshopNumber: number;
	maintenanceStatus: number;
	dateofMaintenancePlan: Date;
	dateofActualMaintenance: Date;
	constructor(arg?: PeriodicMaintenanceData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
