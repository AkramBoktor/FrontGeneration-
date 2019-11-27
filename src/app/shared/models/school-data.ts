
 export class SchoolData {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	dependencyCode: number;
	phaseCode: number;
	educationQualityCode: number;
	periodsOfUseNumber: number;
	constructor(arg?: SchoolData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
