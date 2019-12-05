
 export class ScheduleOnBuildingScope {
    id: number;
    
	buildingCode: string;
	date: string;
	extensionCode: string;
	constructionType: number;
	planYear: string;
	itemCode: number;
	activityCode: string;
	activityQuantityAccordingToItem: string;
	constructor(arg?: ScheduleOnBuildingScope) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
