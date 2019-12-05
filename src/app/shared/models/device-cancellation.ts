
 export class DeviceCancellation {
    id: number;
    
	date: Date;
	schoolName: string;
	laboratoryNumber: string;
	deviceNumber: string;
	constructor(arg?: DeviceCancellation) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
