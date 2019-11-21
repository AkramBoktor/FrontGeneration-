
 export class ScheduleAtTheBuildingLevel {
    id: number;
    
	buildingCode: string;
	date: string;
	extensionCode: string;
	constructionType: number;
	yearPlan: Date;
	itemCode: string;
	activityCode: string;
	activityAmountAccordingToItem: number;
	constructor(arg?: ScheduleAtTheBuildingLevel) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
