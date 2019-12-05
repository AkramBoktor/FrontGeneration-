
 export class GeneralLocationOfAnAdministrativeBuilding {
    id: number;
    
	buildingCode: string;
	centerCode: number;
	branchCode: number;
	limitDirection: number;
	lengthLimit: number;
	theAngleOfInclinationOfTheLimit: number;
	descriptionOfTheLimit: string;
	adjacentNeighborStatus: number;
	mainRoadLevel: number;
	groundFloorLevel: number;
	theLevelOfTheCourtyardWithinTheSite: number;
	seaLevel: number;
	constructor(arg?: GeneralLocationOfAnAdministrativeBuilding) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
