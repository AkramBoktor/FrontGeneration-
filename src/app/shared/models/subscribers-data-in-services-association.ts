
 export class SubscribersDataInServicesAssociation {
    id: number;
    
	employeeCode: string;
	employeeName: string;
	membershipNo: string;
	subscriptionDate: Date;
	constructor(arg?: SubscribersDataInServicesAssociation) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
