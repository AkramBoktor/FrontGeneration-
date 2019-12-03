
 export class ScheduleImplementationDataAssayProject {
    id: number;
    
	buildingCode: string;
	extensionCode: string;
	constructionType: number;
	planYear: string;
	modelCode: string;
	pricingYear: string;
	scheduleCode: string;
	executionDuration: string;
	floorNumber: string;
	baseType: number;
	constructor(arg?: ScheduleImplementationDataAssayProject) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
