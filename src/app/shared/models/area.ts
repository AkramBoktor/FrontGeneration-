
 export class Area {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	groundFloorArea: string;
	backyardArea: string;
	greenAreas: string;
	playgroundArea: string;
	sideWalksArea: string;
	siteTotalArea: string;
	constructor(arg?: Area) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
