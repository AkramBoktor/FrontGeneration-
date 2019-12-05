
 export class RegistrationOfEducationalBuildingsUsedForGeneralPurposes {
    id: number;
    
	governorate: number;
	buildingCode: string;
	purposeCode: number;
	periodFrom: Date;
	periodTo: Date;
	periodUsage: string;
	spaceNumber: string;
	constructor(arg?: RegistrationOfEducationalBuildingsUsedForGeneralPurposes) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
