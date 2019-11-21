
 export class Level {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	extensionNumber: string;
	mainRoadLevel: string;
	northernStreetLevel: string;
	southernStreetLevel: string;
	easternStreetLevel: string;
	westernStreetLevel: string;
	northEastStreetLevel: string;
	northWestStreetLevel: string;
	southEastStreetLevel: string;
	southWestStreetLevel: string;
	northernCourtyardLevel: string;
	southernCourtyardLevel: string;
	easternCourtyardLevel: string;
	westernCourtyardLevel: string;
	courtyardLevelWithinSite: string;
	groundFloorLevel: string;
	constructor(arg?: Level) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
