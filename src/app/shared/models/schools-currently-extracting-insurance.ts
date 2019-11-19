
 export class SchoolsCurrentlyExtractingInsurance{
    id: number;
    
	insuranceCompanyCode: string;
	insuranceCompanyName: string;
	schoolCode: number;
	schoolName: string;
	extensionNumber: string;
	modelCode: number;
	floorsNumber: string;
	classroomNumber: string;
	schoolNumber: string;
	deliveryDate: Date;
	constructor(arg?: SchoolsCurrentlyExtractingInsurance) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
