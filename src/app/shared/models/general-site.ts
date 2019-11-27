
 export class GeneralSite {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	mainRoadTypeCode: number;
	directionCode: number;
	roadWidth: string;
	movementDirectionCode: number;
	quality: string;
	constructor(arg?: GeneralSite) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
