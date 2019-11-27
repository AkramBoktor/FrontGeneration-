
 export class Gate {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	gatesSerial: string;
	gatesSites: string;
	gatesQualityCode: number;
	constructor(arg?: Gate) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
