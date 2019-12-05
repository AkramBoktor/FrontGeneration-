
 export class DifferentFormNotExtracted {
    id: number;
    
	dateForm: Date;
	region: number;
	administration: number;
	formNumber: string;
	formPrice: string;
	formSource: number;
	buildingCode: string;
	destinationType: number;
	destinationCode: number;
	bidNumber: string;
	subtractionType: number;
	accountNumber: string;
	bankCode: number;
	statement: string;
	constructor(arg?: DifferentFormNotExtracted) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
