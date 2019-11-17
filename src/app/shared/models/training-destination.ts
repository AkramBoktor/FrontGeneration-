
 export class TrainingDestination {
    id: number;
    
	destinationCode: string;
	destinationType: number;
	institutionDestinationSpecialization: number;
	name: string;
	titleAddress: string;
	phoneNumber: string;
	fax: string;
	responsibleManagerName: string;
	constructor(arg?: TrainingDestination) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
