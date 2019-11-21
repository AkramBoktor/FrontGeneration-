
 export class SchoolPeriod {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	periodNumber: number;
	schoolName: string;
	responsibleManager: string;
	schoolPupilsType: number;
	schoolPupilsBoysNumber: string;
	schoolPupilsGirlsNumber: string;
	constructor(arg?: SchoolPeriod) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
