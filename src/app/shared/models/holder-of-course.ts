
 export class HolderOfCourse {
    id: number;
    
	employeeCode: string;
	trainingYear: Date;
	managementCode: number;
	majorClassification: number;
	subcategory: number;
	courseCode: string;
	courseDestinationCode: string;
	serialSession: string;
	courseUnitDuration: number;
	courseDuration: number;
	beginningSessionDate: Date;
	courseCost: string;
	constructor(arg?: HolderOfCourse) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
