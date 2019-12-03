
 export class CompleteTitlesOfEducationalBuildings {
    id: number;
    
	buildingCode: string;
	schoolAddress: string;
	constructor(arg?: CompleteTitlesOfEducationalBuildings) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
