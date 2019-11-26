
 export class ContractorPricesBuildingAssay {
    id: number;
    
	itemCode: number;
	itemName: string;
	amount: string;
	price: string;
	buildingCode: string;
	extensionCode: string;
	modelCode: string;
	constructionType: number;
	pLanYear: string;
	priceYear: string;
	constructor(arg?: ContractorPricesBuildingAssay) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
