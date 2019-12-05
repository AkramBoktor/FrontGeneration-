
 export class CorrectionDataSpacesOfTheEducationalBuildingCairoBranch {
    id: number;
    
	governorate: number;
	department: number;
	stage: number;
	constructor(arg?: CorrectionDataSpacesOfTheEducationalBuildingCairoBranch) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
