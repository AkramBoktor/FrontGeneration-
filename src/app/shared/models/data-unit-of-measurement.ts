
 export class DataUnitOfMeasurement {
    id: number;
    
	calibrationUnitCode: number;
	measurementCodeUnit: number;
	measurementNameUnit: string;
	constructor(arg?: DataUnitOfMeasurement) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
