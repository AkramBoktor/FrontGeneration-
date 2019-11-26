
 export class ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding {
    id: number;
    
	buildingCode: string;
	itemCode: string;
	sample: string;
	employmentType: number;
	yearPlan: string;
	extensionCode: number;
	constructionType: number;
	buildingName: string;
	element: number;
	constructor(arg?: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
