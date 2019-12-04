
 export class TheMainRoads {
    id: number;
    
	buildingCode: string;
	centerCode: number;
	branchCode: number;
	mainRoadNumber: string;
	mainRoadStatusCode: number;
	roadWidth: number;
	movementDirectionCode: number;
	usage: string;
	theNameOfTheRoad: string;
	constructor(arg?: TheMainRoads) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
