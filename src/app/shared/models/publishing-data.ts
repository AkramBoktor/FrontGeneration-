
 export class PublishingData {
    id: number;
    
	offeringType: number;
	bidNumber: number;
	publicationNumber: number;
	publicationDate: Date;
	newspaperName: string;
	constructor(arg?: PublishingData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
