
 export class DataSpacesOfTheEducationalBuilding {
    id: number;
    
	buildingCode: string;
	extension: string;
	floor: number;
	code: number;
	spaceName: string;
	area: number;
	series: string;
	constructor(arg?: DataSpacesOfTheEducationalBuilding) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
