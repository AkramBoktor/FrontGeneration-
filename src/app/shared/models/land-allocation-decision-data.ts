
 export class LandAllocationDecisionData {
    id: number;
    
	landID: string;
	allocationNumber: string;
	allocationDate: Date;
	allocationTypeCode: number;
	constructor(arg?: LandAllocationDecisionData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
