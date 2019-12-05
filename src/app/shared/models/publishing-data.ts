
 export class PublishingData {
    id: number;
    
	offeringType: number;
	bidNumber: string;
	publicationNumber: string;
	publicationDate: Date;
	newspaperName: number;
	constructor(arg?: PublishingData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
