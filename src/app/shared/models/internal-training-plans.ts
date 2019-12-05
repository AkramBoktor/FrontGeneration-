
 export class InternalTrainingPlans {
    id: number;
    
	administrationOrBranchCode: number;
	date: Date;
	trainingNumber: string;
	trainingTopic: string;
	constructor(arg?: InternalTrainingPlans) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
