
 export class IntroducingExceptionForBranchesEngineer {
    id: number;
    
	branchCode: number;
	executiveEngineerNumber: string;
	schoolNumber: string;
	attachedNumber: string;
	yearPlan: Date;
	constructionType: number;
	bidNumber: string;
	offeringType: number;
	supervisionBeginningDate: Date;
	type: Date;
	constructor(arg?: IntroducingExceptionForBranchesEngineer) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
