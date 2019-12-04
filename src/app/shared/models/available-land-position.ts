
 export class AvailableLandPosition {
    id: number;
    
	projectCode: string;
	document: number;
	constructor(arg?: AvailableLandPosition) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
