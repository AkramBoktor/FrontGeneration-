
 export class ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding {
    id: number;
    
	buildingCode: string;
	itemCode: number;
	sample: string;
	employmentType: number;
	yearPlan: Date;
	extensionCode: string;
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
