
 export class DifferentFormAddedButNotExtracted {
    id: number;
    
	dateForm: Date;
	region: number;
	administration: number;
	serialForm: number;
	formAmount: string;
	sourceForm: number;
	buildingCode: string;
	destinationType: number;
	destinationCode: number;
	bidNumber: string;
	offeringType: number;
	accountNumber: string;
	bankCode: number;
	statement: string;
	constructor(arg?: DifferentFormAddedButNotExtracted) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
