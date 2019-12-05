
 export class BarrierDataForThePlotOfLand {
    id: number;
    
	landID: string;
	obstacleCode: number;
	constructor(arg?: BarrierDataForThePlotOfLand) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
