
 export class TemporarySeizureData {
    id: number;
    
	schoolNumber: number;
	temporarySeizureNumber: string;
	dateOfTemporarySeizure: Date;
	numberOfPublicationsInEgyptianFacts: string;
	dateOfPublicationInTheEgyptianFacts: Date;
	constructor(arg?: TemporarySeizureData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
