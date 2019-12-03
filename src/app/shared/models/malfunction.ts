
 export class Malfunction {
    id: number;
    
	buildingType: number;
	buildingCode: string;
	laboratoryType: number;
	laboratoryNumber: string;
	equipmentCode: number;
	deviceType: number;
	deviceNumber: string;
	malfunctionDate: Date;
	malfunctionPart: number;
	malfunctionPartNumber: number;
	malfunctionPartSerial: string;
	constructor(arg?: Malfunction) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
