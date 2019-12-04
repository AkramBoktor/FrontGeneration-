
 export class SchoolLab {
    id: number;
    
	buildingType: number;
	buildingCode: string;
	areaCode: number;
	laboratoryNumber: string;
	laboratoryType: number;
	constructor(arg?: SchoolLab) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
