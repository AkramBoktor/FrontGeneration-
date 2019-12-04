
 export class ThePlannedStartDateForTheSchedule {
    id: number;
    
	buildingNumberEducational: string;
	tenderCode: string;
	yearPlan: string;
	subtractionType: number;
	serialSupplement: string;
	constructionType: number;
	governorateCode: number;
	typeOFStartDateForChart: string;
	startDateForChart: Date;
	notes: string;
	constructor(arg?: ThePlannedStartDateForTheSchedule) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
