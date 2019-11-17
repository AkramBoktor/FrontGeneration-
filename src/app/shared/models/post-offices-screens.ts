
 export class PostOfficesScreens {
    id: number;
    
	identityNumber: number;
	x: number;
	y: number;
	z: number;
	office: number;
	governorate: number;
	district: number;
	constructor(arg?: PostOfficesScreens) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
