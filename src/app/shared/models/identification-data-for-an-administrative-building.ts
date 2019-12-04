
 export class IdentificationDataForAnAdministrativeBuilding {
    id: number;
    
	regionalCenterCode: number;
	branchCode: number;
	buildingCode: string;
	nameOfTheBuildingOwner: string;
	previousUseOfTheBuilding: string;
	theBasicPurposeOfBuildingTheBuilding: number;
	classificationCode: number;
	useBuildingPosition: number;
	educationalAdministration: number;
	codeSectionCenter: number;
	codeNeighborhoodVillage: number;
	cityCode: number;
	villageContinued: string;
	streetNameOfTheAdministrativeBuilding: string;
	streetNumber: string;
	administrativeBuildingPhoneNumber: string;
	landOwnershipCode: number;
	buildingOwnershipCode: number;
	constructor(arg?: IdentificationDataForAnAdministrativeBuilding) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
