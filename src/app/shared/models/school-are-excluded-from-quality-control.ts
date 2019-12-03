
 export class SchoolAreExcludedFromQualityControl {
    id: number;
    
	schoolCode: string;
	schoolName: string;
	date: Date;
	constructor(arg?: SchoolAreExcludedFromQualityControl) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
