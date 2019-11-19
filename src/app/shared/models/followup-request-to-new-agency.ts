
 export class FollowupRequestToNewAgency {
    id: number;
    
	publisherCode: number;
	publicationDate: Date;
	pageNumber: string;
	publicationCodePlace: number;
	specificEntityCode: number;
	requestType: number;
	presentationDate: Date;
	visaDate: Date;
	newsFollowersNo: string;
	constructor(arg?: FollowupRequestToNewAgency) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
