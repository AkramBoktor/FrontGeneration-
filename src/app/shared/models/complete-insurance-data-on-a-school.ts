
 export class CompleteInsuranceDataOnASchool {
    id: number;
    
	buildingCode: string;
	extensionCode: string;
	schoolType: number;
	modelNumber: string;
	floorsNumber: string;
	classroomNumber: string;
	constructor(arg?: CompleteInsuranceDataOnASchool) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
