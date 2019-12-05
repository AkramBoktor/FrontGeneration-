
 export class CancelFromTheMaintenancePlan {
    id: number;
    
	buildinNumber: string;
	planYear: Date;
	maintenanceType: number;
	exclusionReason: number;
	constructor(arg?: CancelFromTheMaintenancePlan) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
