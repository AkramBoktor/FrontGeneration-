
 export class AssayOfWithdrawnWorks {
    id: number;
    
	buildingCode: string;
	extensionCode: string;
	modelCode: string;
	constructionType: number;
	planYear: string;
	pricingYear: string;
	workType: number;
	itemCode: number;
	itemName: string;
	amount: string;
	price: string;
	constructor(arg?: AssayOfWithdrawnWorks) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
