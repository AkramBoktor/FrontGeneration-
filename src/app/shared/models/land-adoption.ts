
 export class LandAdoption {
    id: number;
    
	landCode: string;
	proposedPhase: number;
	landValidity: number;
	modelCode: string;
	accreditationDate: Date;
	rejectionReasonCode: number;
	notes: string;
	constructor(arg?: LandAdoption) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
