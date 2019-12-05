
 export class ThePositionOfTheOfficesReceivedFromThePostOffice {
    id: number;
    
	postOfficeReceiptYear: Date;
	governorate: number;
	iD: string;
	officeIsCanceledOrDeferred: number;
	duplicatedOffice: number;
	undeveloped: number;
	surveyingStatus: number;
	constructor(arg?: ThePositionOfTheOfficesReceivedFromThePostOffice) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
