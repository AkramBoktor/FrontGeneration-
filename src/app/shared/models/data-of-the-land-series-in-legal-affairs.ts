
 export class DataOfTheLandSeriesInLegalAffairs {
    id: number;
    
	landIDLegalAffairs: string;
	landID: string;
	constructor(arg?: DataOfTheLandSeriesInLegalAffairs) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
