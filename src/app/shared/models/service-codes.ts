
 export class ServiceCodes {
    id: number;
    
	serviceCode: string;
	serviceConfiguration: string;
	constructor(arg?: ServiceCodes) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
