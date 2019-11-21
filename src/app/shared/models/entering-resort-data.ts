
 export class EnteringResortData {
    id: number;
    
	employeeCode: string;
	employeeName: string;
	membershipNo: string;
	resortPlace: string;
	resortStartDate: Date;
	resortEndDate: Date;
	floorNumber: number;
	apartmentNumber: number;
	resortValue: number;
	insuranceValue: number;
	insuranceExpenses: number;
	companionsNumber: number;
	insuranceDeductionValue: number;
	constructor(arg?: EnteringResortData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
