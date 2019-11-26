
 export class EducationalStudies {
    id: number;
	
	educationQuality: string;

	buildingCode: string;
	schoolName: string;
	studyReason: number;
	department: number;
	village: number;
	attachedVillage: number;
	totalArea: number;
	originalLandOwner: number;
	educationalAdministration: number;
	registrationNumber: number;
	regionPopulationDensity: number;
	regionAdministrativeClassification: number;
	educationalNeedStance: number;
	registrationDate: Date;
	registrationTiming: string;
	userName: string;
	studyHistory: Date;
	educationalLevel: number;
	pupilsScheduledNumber: number;
	pupilsType: number;
	classesNumber: number;
	influencingSurroundingSchools: number;
	localizationCircleRadius: number;
	nearestCommunityDistance: number;
	localizationDepartmentSecondPeriod: number;
	needAreaStance: number;
	constructor(arg?: EducationalStudies) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
