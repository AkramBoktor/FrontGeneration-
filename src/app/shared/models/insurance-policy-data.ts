
 export class InsurancePolicyData {
    id: number;
    
	companyCode: string;
	insurancePolicyDate: Date;
	insurancePolicyCode: string;
	buildingCode: string;
	extensionCode: string;
	modelCode: string;
	floorsNumber: string;
	classroomNumber: string;
	insuranceAmount: string;
	insuranceFee: number;
	deliveryDate: Date;
	paymentReceiptNumber: string;
	constructor(arg?: InsurancePolicyData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
