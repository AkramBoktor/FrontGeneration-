
 export class FenceFile {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	fenceCode: string;
	fenceHight: string;
	fenceStatusCode: number;
	northSideLength: string;
	southSideLength: string;
	eastSideLength: string;
	westSideLength: string;
	northEastSideLength: string;
	southEastSidelength: string;
	northWestLength: string;
	southWestLength: string;
	constructionMaterial: number;
	constructor(arg?: FenceFile) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
