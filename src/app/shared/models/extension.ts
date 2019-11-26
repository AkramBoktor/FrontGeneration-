
 export class Extension {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	extensionSerial: string;
	totalNumberOfFloors: string;
	totalExtensionArea: string;
	extensionStructureStatusCode: number;
	interiorFinishesStatusCode: number;
	sanitationStatusCode: number;
	electricalWorksStatusCode: number;
	extensionConstructionDate: Date;
	extensionAbilityForRampingCode: number;
	extensionConstructionSystemCode: number;
	extensionConstructionWayCode: number;
	extensionWallConstructionMaterialsCode: number;
	roofingMaterialsCode: number;
	classFloorsFinishingCode: number;
	corridorsFloorFinishingCode: number;
	bathroomsFloorFinishingCode: number;
	labsFloorFinishingCode: number;
	otherFloorFinishingCode: number;
	classWallsFinishingCode: number;
	corridorsWallsFinishingCode: number;
	bathroomsWallsFinishingCode: number;
	labsWallsFinishingCode: number;
	otherWallsFinishingCode: number;
	classCeilingsFinishingCode: number;
	corridorsCeilingsFinishingCode: number;
	bathroomsCeilingsFinishingCode: number;
	labsCeilingsFinishingCode: number;
	otherCeilingsFinishingCode: number;
	exteriorFinishingCode: number;
	constructor(arg?: Extension) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
