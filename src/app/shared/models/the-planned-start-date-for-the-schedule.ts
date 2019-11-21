
 export class ThePlannedStartDateForTheSchedule {
    id: number;
    
	buildingNumberEducational: number;
	tenderCode: string;
	yearPlan: string;
	subtractionType: number;
	serialSupplement: string;
	constructionType: number;
	governorateCode: string;
	typeOFStartDateForChart: number;
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
