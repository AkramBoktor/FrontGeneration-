
 export class ObstaclesAndMeasuresTaken {
    id: number;
    
	governorate: number;
	iD: number;
	referencesCode: string;
	difficulties: string;
	procedures: string;
	extensionCode: string;
	constructionType: number;
	offeringType: number;
	bidNumber: string;
	contractorCode: string;
	referenceCode: number;
	executionCode: number;
	constructor(arg?: ObstaclesAndMeasuresTaken) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
