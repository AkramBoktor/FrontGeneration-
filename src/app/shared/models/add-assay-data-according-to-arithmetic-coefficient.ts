
 export class AddAssayDataAccordingToArithmeticCoefficient {
    id: number;
    
	buildingCode: string;
	extensionCode: string;
	modelCode: number;
	constructionType: number;
	planYear: Date;
	priceYear: Date;
	workType: number;
	calculationCoefficient: number;
	itemCode: number;
	itemName: string;
	quntity: number;
	price: number;
	constructor(arg?: AddAssayDataAccordingToArithmeticCoefficient) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
