
 export class BoundariesOfThePublicSite {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	direction: number;
	length: string;
	slope: string;
	description: string;
	neighborState: number;
	constructor(arg?: BoundariesOfThePublicSite) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
