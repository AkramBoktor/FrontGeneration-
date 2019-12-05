
 export class ElementsOfAssayItemsForWeightsFactorOfABuilding {
    id: number;
    
	buildingCode: string;
	extensionCode: string;
	constructionType: number;
	planYear: string;
	jobType: number;
	date: Date;
	itemCode: number;
	testCode: string;
	elementCode: number;
	elementName: string;
	constructor(arg?: ElementsOfAssayItemsForWeightsFactorOfABuilding) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
