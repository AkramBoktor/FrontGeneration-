
 export class ThePositionsOfLandAvailable {
    id: number;
    
	projectCode: string;
	documentCode: number;
	constructor(arg?: ThePositionsOfLandAvailable) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
