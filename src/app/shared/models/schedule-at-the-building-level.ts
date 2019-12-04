
 export class ScheduleAtTheBuildingLevel {
    id: number;
    
	buildingCode: string;
	date: Date;
	extensionCode: string;
	constructionType: number;
	yearPlan: Date;
	itemCode: number;
	activityCode: string;
	activityAmountAccordingToItem: string;
	constructor(arg?: ScheduleAtTheBuildingLevel) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
