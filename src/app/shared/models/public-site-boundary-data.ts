
 export class PublicSiteBoundaryData {
    id: number;
    
	landCode: string;
	averageSiteLevel: string;
	proposedAverageYardLevel: string;
	highestPointLevel: string;
	lowestPointLevel: string;
	borderName: string;
	borderLength: string;
	hasNeighbor: number;
	neighborLevel: string;
	neighborDescription: string;
	fence: number;
	constructor(arg?: PublicSiteBoundaryData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
