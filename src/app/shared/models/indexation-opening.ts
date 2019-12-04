
 export class IndexationOpening {
    id: number;
    
	buildingCode: string;
	extensionCode: string;
	modelCode: number;
	constructionType: number;
	planYear: number;
	pricingYear: number;
	jopType: number;
	itemCode: string;
	itemName: string;
	quantity: number;
	price: string;
	constructor(arg?: IndexationOpening) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
