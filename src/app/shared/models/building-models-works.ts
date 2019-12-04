
 export class BuildingModelsWorks {
    id: number;
    
	modelCode: string;
	workType: number;
	activityType: string;
	itemCode: number;
	itemName: string;
	unitCode: number;
	amount: string;
	constructor(arg?: BuildingModelsWorks) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
