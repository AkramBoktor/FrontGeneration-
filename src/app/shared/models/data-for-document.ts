
 export class DataForDocument {
    id: number;
    
	bookNumber: string;
	bookTitle: string;
	bookState: number;
	bookDescription: string;
	addtionDate: Date;
	documentType: number;
	sourceDocument: number;
	documentStatus: number;
	priceDocument: string;
	documentLanguage: number;
	partNumber: string;
	documentPagesNumber: string;
	bookSize: string;
	editionStatement: string;
	classificationNumber: string;
	internationalNumbering: string;
	publisherCode: number;
	publicationPlace: number;
	publicationYear: Date;
	authorCode: string;
	authorName: string;
	subjectCode: string;
	subjectName: string;
	libraryCode: string;
	libraryName: string;
	insightType: number;
	insightCode: number;
	constructor(arg?: DataForDocument) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
