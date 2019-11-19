
 export class ExtensionInsurancePolicyData {
    id: number;
    
	buildingCode: number;
	insuranceCompany: string;
	modelCode: string;
	floorsNumber: string;
	classroomNumber: string;
	extensionDate: Date;
	extensionCode: string;
	extensionAmount: string;
	insuranceFee: string;
	constructor(arg?: ExtensionInsurancePolicyData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
