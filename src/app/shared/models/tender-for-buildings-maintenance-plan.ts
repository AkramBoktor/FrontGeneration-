
 export class TenderForBuildingsMaintenancePlan {
    id: number;
    
	governorate: number;
	yearPlan: Date;
	maintenanceType: number;
	buildingNumber: string;
	schoolName: string;
	constructor(arg?: TenderForBuildingsMaintenancePlan) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
