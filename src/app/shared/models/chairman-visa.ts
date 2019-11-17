
 export class ChairmanVisa {
    id: number;
    
	publisherCode: number;
	pageNumber: string;
	publicationDate: Date;
	publicationCodePlace: number;
	entityTypeCode: number;
	specificEntityCode: number;
	display: number;
	presentationDate: Date;
	aMCode: number;
	aFCode: number;
	showResult: number;
	visaDate: Date;
	serial: string;
	visaText: string;
	constructor(arg?: ChairmanVisa) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
