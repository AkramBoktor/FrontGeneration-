
 export class IssuingASupplyOrderForASchool {
    id: number;
    
	processingType: number;
	yearPlan: string;
	offeringType: number;
	offeringMethod: number;
	bidNumber: string;
	orderNumber: string;
	supplyOrderDate: Date;
	orderType: string;
	constructionPlanYear: string;
	buildingName: string;
	number: string;
	constructionType: number;
	companyName: string;
	listName: number;
	quantity: string;
	constructor(arg?: IssuingASupplyOrderForASchool) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
