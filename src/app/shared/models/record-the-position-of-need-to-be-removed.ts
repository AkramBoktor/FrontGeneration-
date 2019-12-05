
 export class RecordThePositionOfNeedToBeRemoved {
    id: number;
    
	schoolCode: string;
	extension: string;
	status: number;
	needCode: number;
	constructor(arg?: RecordThePositionOfNeedToBeRemoved) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
