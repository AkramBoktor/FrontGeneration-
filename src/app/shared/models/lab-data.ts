
 export class LabData {
    id: number;
    
	laboratoryCode: string;
	branchCode: number;
	laboratoryAddress: string;
	workPhone: string;
	laboratoryManger: string;
	basicMatrial: string;
	subMatrial: string;
	testingCode: string;
	testingName: string;
	existing: number;
	constructor(arg?: LabData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
