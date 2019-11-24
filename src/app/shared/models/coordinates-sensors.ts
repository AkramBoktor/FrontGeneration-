
 export class CoordinatesSensors {
    id: number;
    
	buildingCode: string;
	sensorNumber: number;
	coordinatesX: string;
	coordinatesY: string;
	constructor(arg?: CoordinatesSensors) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
