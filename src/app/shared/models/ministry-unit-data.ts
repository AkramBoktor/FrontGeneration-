
 export class MinistryUnitData {
    id: number;
    
	ministryType: number;
	branchCode: number;
	departmentCode: number;
	unitType: number;
	unitCode: string;
	unitName: string;
	unitAddress: string;
	headquarters: string;
	constructor(arg?: MinistryUnitData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
