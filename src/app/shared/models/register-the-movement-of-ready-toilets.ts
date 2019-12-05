
 export class RegisterTheMovementOfReadyToilets {
    id: number;
    
	orderDate: Date;
	toiletCode: number;
	schoolRequiredTransport: string;
	governorate: number;
	transportationSchool: number;
	constructor(arg?: RegisterTheMovementOfReadyToilets) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
