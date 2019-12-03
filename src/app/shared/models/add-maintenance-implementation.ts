
 export class AddMaintenanceImplementation {
    id: number;
    
	period: Date;
	region: number;
	maintainer: string;
	building: string;
	laboratoryType: number;
	code: string;
	plannedDate: Date;
	actualDate: Date;
	case: string;
	doNotExecute: number;
	constructor(arg?: AddMaintenanceImplementation) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
