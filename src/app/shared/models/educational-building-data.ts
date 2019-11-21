
 export class EducationalBuildingData {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	schoolName: string;
	prevSchoolName: string;
	purposeOfConstruction: number;
	useBuildingPosition: number;
	educationalAdministration: number;
	sectionCenter: number;
	village: number;
	city: number;
	continuedToVillage: number;
	educationalBuildingStreetName: string;
	streetNumber: string;
	educationalBuildingPhoneNumber: string;
	buildingConstructionCost: string;
	landOwnershipCode: number;
	buildingOwnershipCode: number;
	constructor(arg?: EducationalBuildingData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
