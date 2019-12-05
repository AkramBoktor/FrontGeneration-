
 export class RecordingEmployeeDebtValues {
    id: number;
    
	correctionNumber: string;
	discountType: number;
	employeeCode: string;
	discountValue: string;
	constructor(arg?: RecordingEmployeeDebtValues) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
