
 export class ImplementationDataSchedule {
    id: number;
    
	scheduleCode: string;
	executionDuration: string;
	baseType: number;
	floorsNumber: string;
	constructor(arg?: ImplementationDataSchedule) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
