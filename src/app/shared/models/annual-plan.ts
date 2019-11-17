
 export class AnnualPlan {
    id: number;
    
	trainingYear: Date;
	majorClassification: number;
	subcategory: number;
	courseCode: string;
	courseDestinationCode: number;
	serialSession: string;
	administrationOrRegion: number;
	candidatesNumber: string;
	constructor(arg?: AnnualPlan) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
