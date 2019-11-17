
 export class RespondToVisa {
    id: number;
    
	publisherCode: number;
	publicationDate: Date;
	publicationCodePlace: number;
	entityTypeCode: number;
	replyCode: number;
	replyDate: Date;
	entityReplyCode: number;
	orderTypeCode: number;
	replierCode: string;
	hasAttachments: string;
	serial: string;
	replyText: string;
	constructor(arg?: RespondToVisa) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
