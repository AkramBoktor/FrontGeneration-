
 export class BusinessAssayForOthers {
    id: number;
    
	buildingCode: string;
	modelCode: string;
	constructionType: number;
	planYear: string;
	pricingYear: string;
	employmentType: number;
	itemCode: number;
	itemName: string;
	quantity: string;
	price: string;
	constructor(arg?: BusinessAssayForOthers) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
