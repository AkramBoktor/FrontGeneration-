
 export class AddPlanConditioning {
    id: number;
    
	period: Date;
	region: number;
	maintainer: string;
	maintenanceDescription: number;
	buildingType: number;
	building: string;
	buildingNumber: number;
	plannedDate: Date;
	constructor(arg?: AddPlanConditioning) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
