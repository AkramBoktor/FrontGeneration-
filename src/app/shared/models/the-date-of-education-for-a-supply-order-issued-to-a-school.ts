
 export class TheDateOfEducationForASupplyOrderIssuedToASchool {
    id: number;
    
	processingType: number;
	yearPlan: string;
	offeringType: number;
	offeringMethod: number;
	bidNumber: string;
	orderNumber: string;
	supplyOrderDate: Date;
	constructionPlanYear: string;
	buildingName: string;
	annexNumber: string;
	constructionType: number;
	campanyName: string;
	deliveryDate: Date;
	constructor(arg?: TheDateOfEducationForASupplyOrderIssuedToASchool) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
