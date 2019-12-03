
 export class AddTheImplementationOfAirConditioningMaintenance {
    id: number;
    
	period: Date;
	region: number;
	maintainer: string;
	building: string;
	laboratoryType: number;
	code: string;
	plannedDate: Date;
	actualDate: Date;
	constructor(arg?: AddTheImplementationOfAirConditioningMaintenance) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
