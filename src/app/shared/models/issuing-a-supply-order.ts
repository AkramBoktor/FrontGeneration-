
 export class IssuingASupplyOrder {
    id: number;
    
	processingType: number;
	orderNumber: string;
	supplyOrderDate: Date;
	orderType: string;
	yearPlan: string;
	constructionPlanYear: Date;
	buildingName: string;
	quantity: string;
	listName: string;
	companyName: string;
	number: string;
	offeringType: number;
	offeringMethod: number;
	bidNumber: string;
	constructionType: number;
	typeOfFunding: number;
	constructor(arg?: IssuingASupplyOrder) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
