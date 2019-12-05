
 export class DeliveryDateForASupplyOrder {
    id: number;
    
	deliveryDate: Date;
	campanyName: string;
	constructionType: number;
	annexNumber: string;
	buildingName: string;
	constructionPlanYear: string;
	supplyOrderDate: Date;
	orderNumber: string;
	bidNumber: string;
	offeringMethod: number;
	offeringType: number;
	yearPlan: string;
	processingType: number;
	constructor(arg?: DeliveryDateForASupplyOrder) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
