
 export class DataOfEducationalStudy {
    id: number;
    
	buildingCode: string;
	schoolName: string;
	studyReason: number;
	department: number;
	village: number;
	continuedVillage: number;
	totalArea: number;
	originalLandOwner: number;
	educationalAdministration: number;
	registrationNumber: string;
	regionPopulationDensity: number;
	regionAdministrativeClassification: number;
	aducationalNeedAttitude: number;
	registrationDate: Date;
	registrationTiming: string;
	userName: string;
	studyHistory: string;
	educationalLevel: number;
	educationQuality: number;
	pupilsScheduledNumber: number;
	pupilsType: number;
	chaptersNumber: number;
	influencingSurroundingSchools: number;
	localizationCircleRadius: number;
	nearestCommunityDistance: number;
	needPositionArea: number;
	localizationDepartmentSecondPeriod: number;
	constructor(arg?: DataOfEducationalStudy) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
