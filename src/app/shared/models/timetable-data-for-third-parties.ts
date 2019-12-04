
 export class TimetableDataForThirdParties {
    id: number;
    
	buildingCode: string;
	extensionCode: string;
	constructionType: number;
	planYear: Date;
	modelCode: string;
	pricingYear: Date;
	menuType: number;
	timetable: string;
	durationofexecution: string;
	numberofFloors: string;
	constructor(arg?: TimetableDataForThirdParties) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
