
 export class ReasonForEndingEngineerHousingOnProject {
    id: number;
    
	terminateResonCode: string;
	terminateReson: string;
	constructor(arg?: ReasonForEndingEngineerHousingOnProject) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
