
 export class TypicalFinalExaminationCommitteeReport {
    id: number;
    
	bidNumber: string;
	constructionType: number;
	buildingName: string;
	processingType: number;
	orderNumber: string;
	supplyOrderDate: Date;
	constructionPlanYear: string;
	quantity: string;
	listName: string;
	companyName: string;
	number: string;
	offeringType: number;
	offeringMethod: number;
	constructor(arg?: TypicalFinalExaminationCommitteeReport) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
