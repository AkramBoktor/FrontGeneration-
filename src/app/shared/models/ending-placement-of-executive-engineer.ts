
 export class EndingPlacementOfExecutiveEngineer {
    id: number;
    
	branchCode: number;
	executiveEngineerNumber: string;
	schoolNumber: string;
	atthachEngineerNumber: string;
	yearPlan: Date;
	constructionType: number;
	bidNumber: string;
	offeringType: number;
	supervisionBeginningDate: Date;
	supervisionEndDate: Date;
	supervisionEndReson: number;
	constructor(arg?: EndingPlacementOfExecutiveEngineer) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
