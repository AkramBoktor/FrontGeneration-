
 export class Processing {
    id: number;
    
	buildingCode: string;
	regionalCenterCode: number;
	branchCode: number;
	serialSupplement: string;
	floorNumber: string;
	spaceCode: number;
	processingType: number;
	processingNumber: string;
	processingState: number;
	constructor(arg?: Processing) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
