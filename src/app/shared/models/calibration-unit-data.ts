
 export class CalibrationUnitData {
    id: number;
    
	calibrationUnitCode: string;
	calibrationUnitName: string;
	constructor(arg?: CalibrationUnitData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
