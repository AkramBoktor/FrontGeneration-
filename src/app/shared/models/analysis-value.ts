
 export class AnalysisValue {
    id: number;
    
	schoolName: number;
	sensorsNumber: number;
	sensorsDate: Date;
	primaryGroundwaterLevel: number;
	finalGroundwaterLevel: number;
	layerNumber: number;
	endOfLayerDepth: number;
	selectionLevel: string;
	firstLevelCode: number;
	secondLevelCode: number;
	thirdLevelCode: number;
	constructor(arg?: AnalysisValue) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
