
 export class FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches {
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
	number: string;
	companyName: string;
	constructor(arg?: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
