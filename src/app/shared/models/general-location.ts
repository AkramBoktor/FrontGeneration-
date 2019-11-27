
 export class GeneralLocation {
    id: number;
    
	buildingCode: string;
	sectionCode: number;
	branchCode: number;
	mainRoadTypeCode: number;
	mainRoadStatusCode: number;
	roadWidth: number;
	roadDirectionCode: number;
	type: string;
	constructor(arg?: GeneralLocation) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
