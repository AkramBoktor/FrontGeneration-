
 export class NutritionDataForEducationalBuilding {
    id: number;
    
	buildingCode: string;
	thereIsNutrition: number;
	constructor(arg?: NutritionDataForEducationalBuilding) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
