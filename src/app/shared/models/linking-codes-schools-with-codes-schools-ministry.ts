
 export class LinkingCodesSchoolsWithCodesSchoolsMinistry {
    id: number;
    
	governorate: number;
	administration: number;
	authoritySchoolCode: string;
	schoolAddress: string;
	centerDepartment: number;
	villageNeighborhood: number;
	stage: number;
	periodsNumber: string;
	periodName1: string;
	pupilsCount1: string;
	periodName2: string;
	pupilsCount2: string;
	hostedSchool: string;
	hostedSchoolPupilsCount: string;
	ministrySchoolCode: string;
	constructor(arg?: LinkingCodesSchoolsWithCodesSchoolsMinistry) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
