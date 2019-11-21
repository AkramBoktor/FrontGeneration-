
 export class InfluentialOcean {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	effectTypeCode: number;
	effectCode: number;
	constructor(arg?: InfluentialOcean) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
