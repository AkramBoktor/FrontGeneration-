
 export class JobData {
    id: number;
    
	buildingType: number;
	offeringType: number;
	bidNumber: string;
	group: string;
	school: string;
	workOrderNumber: string;
	educationalAdministration: number;
	workOrderDate: Date;
	supplierNumber: string;
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
