
 export class MasterFilesDepartment {
    id: number;
    
	branchCodeorAdministration: number;
	areaCode: number;
	roomPhoneNumber: string;
	equimentType: number;
	deviceType: number;
	deviceNumber: string;
	manufacturer: string;
	startDate: Date;
	warrantyperiod: number;
	supplierCompany: string;
	constructor(arg?: MasterFilesDepartment) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
