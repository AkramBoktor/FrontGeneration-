
 export class AssayWeightsFactorItems {
    id: number;
    
	buildingCode: string;
	extensionCode: string;
	model: string;
	constructionType: number;
	planYear: string;
	pricingYear: string;
	jobType: number;
	testCode: string;
	itemCode: number;
	itemName: string;
	constructor(arg?: AssayWeightsFactorItems) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
