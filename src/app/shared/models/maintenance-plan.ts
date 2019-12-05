
 export class MaintenancePlan {
    id: number;
    
	buildingNumber: number;
	branch: string;
	region: string;
	yearPlan: Date;
	constructionType: number;
	executionDuration: Date;
	bidNumber: string;
	offeringType: number;
	physicalLocationreceivingDate: Date;
	plannerLocationReceivingDate: Date;
	constructor(arg?: MaintenancePlan) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
