
 export class BasicDataLogging {
    id: number;
    
	publisherCode: number;
	publicationDate: Date;
	pageNumber: string;
	publicationCodePlace: number;
	authorName: string;
	number: string;
	series: string;
	newsTitle: string;
	constructor(arg?: BasicDataLogging) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
