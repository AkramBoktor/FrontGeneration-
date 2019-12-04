
 export class BuildingAssays {
    id: number;
    
	buildingCode: string;
	extensionCode: string;
	modelCode: string;
	constructionType: number;
	planYear: string;
	pricingYear: Date;
	workType: number;
	itemCode: string;
	itemName: string;
	amount: string;
	price: number;
	constructor(arg?: BuildingAssays) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
