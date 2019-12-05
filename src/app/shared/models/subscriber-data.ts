
 export class SubscriberData {
    id: number;
    
	employeeCode: string;
	admistrationCode: number;
	birthDate: Date;
	hiringDate: Date;
	subscriptionDate: Date;
	membershipNo: string;
	constructor(arg?: SubscriberData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
