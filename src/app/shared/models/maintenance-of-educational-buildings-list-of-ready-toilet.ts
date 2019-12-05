
 export class MaintenanceOfEducationalBuildingsListOfReadyToilet {
    id: number;
    
	orderDate: Date;
	toiletCode: string;
	fromSchool: string;
	fromGovernment: number;
	toSchool: string;
	constructor(arg?: MaintenanceOfEducationalBuildingsListOfReadyToilet) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
