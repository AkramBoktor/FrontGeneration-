
 export class PositionOfLeasedBuildings {
    id: number;
    
	iD: string;
	situation: number;
	constructor(arg?: PositionOfLeasedBuildings) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
