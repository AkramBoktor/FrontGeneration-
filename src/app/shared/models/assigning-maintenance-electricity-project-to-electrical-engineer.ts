
 export class AssigningMaintenanceElectricityProjectToElectricalEngineer {
    id: number;
    
	branchCode: number;
	executiveEngineerNumber: string;
	schoolNumber: string;
	attachEngineerNumber: string;
	yearPlan: Date;
	constructionType: number;
	bidNumber: string;
	offeringType: number;
	supervisionBeginningDate: Date;
	type: string;
	constructor(arg?: AssigningMaintenanceElectricityProjectToElectricalEngineer) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
