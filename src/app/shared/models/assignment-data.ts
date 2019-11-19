
 export class AssignmentData {
    id: number;
    
	offeringType: number;
	bidNumber: number;
	technicalReport: string;
	constructor(arg?: AssignmentData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
