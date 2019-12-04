
 export class BasicDataOfTheEducationalBuildingCairoBranch {
    id: number;
    
	buildingCode: string;
	usePosition: number;
	address: string;
	phoneNumber: string;
	landOwnership: number;
	buildingOwnership: number;
	fenceCode: number;
	fenceHeight: string;
	fenceState: number;
	fenceRibNorth: number;
	fenceRibSouth: number;
	fenceRibWest: number;
	fenceRibEast: number;
	northeastFence: number;
	northwestFence: number;
	southeastFence: number;
	southwestFence: number;
	buildingMaterial: number;
	coordinatesX: number;
	coordinatesY: number;
	coordinatesZ: number;
	positiveInfluentialStations: number;
	negativeInfluentialStations: number;
	constructor(arg?: BasicDataOfTheEducationalBuildingCairoBranch) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
