
 export class FollowUpDailyMaintenance {
    id: number;
    
	buildingNumber: number;
	branchNumber: number;
	regionCode: number;
	yearPlan: Date;
	implementationDuration: string;
	constructionType: number;
	plannerDeliveryDate: Date;
	physicaldeliveryDate: Date;
	bidNumber: string;
	offeringType: number;
	dateLastFollow: Date;
	supervisingEngineer: string;
	completionRate: number;
	delayReason: string;
	primaryDeliveryDate: Date;
	finalDeliveryDate: Date;
	constructor(arg?: FollowUpDailyMaintenance) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
