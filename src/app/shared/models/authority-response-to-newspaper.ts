
 export class AuthorityResponseToNewspaper {
    id: number;
    
	publisherCode: number;
	publicationDate: Date;
	pageNumber: string;
	publicationCodePlace: number;
	newsTitle: string;
	authorityrReplyDate: Date;
	constructor(arg?: AuthorityResponseToNewspaper) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
