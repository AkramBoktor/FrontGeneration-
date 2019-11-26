
 export class MemoirsOfTransgression {
    id: number;
    
	buildingCode: string;
	bidNumber: string;
	offeringType: number;
	constructionType: number;
	planYear: Date;
	noteNumber: number;
	attachment: string;
	itemCode: number;
	itemName: string;
	price: number;
	overtakingAmount: number;
	constructor(arg?: MemoirsOfTransgression) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
