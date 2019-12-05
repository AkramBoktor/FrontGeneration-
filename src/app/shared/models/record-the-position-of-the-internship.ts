
 export class RecordThePositionOfTheInternship {
    id: number;
    
	administrationCode: number;
	date: Date;
	trainingNumber: string;
	trainingTopic: string;
	constructor(arg?: RecordThePositionOfTheInternship) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
