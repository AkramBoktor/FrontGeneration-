
 export class SchoolsDoNotNeedInsurance {
    id: number;
    
	theNumberOfTheLetter: string;
	schoolNumber: number;
	annexNumber: string;
	modelNumber: string;
	numberOfFloors: number;
	constructor(arg?: SchoolsDoNotNeedInsurance) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
