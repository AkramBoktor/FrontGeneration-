
 export class PublicWaterNetwork {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	publicNetworkDiameter: string;
	distance: string;
	constructor(arg?: PublicWaterNetwork) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
