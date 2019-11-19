
 export class JobData {
    id: number;
    
	buildingType: number;
	offeringType: number;
	bidNumber: number;
	group: string;
	school: number;
	workOrderNumber: number;
	educationalAdministration: number;
	workOrderDate: Date;
	supplierNumber: number;
	executionDuration: number;
	bouns: number;
	workOrderValue: number;
	totalValue: number;
	constructionType: number;
	maintenanceType: string;
	constructor(arg?: JobData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
