
 export class MinistryOfSolidarityAndCommunications {
    id: number;
    
	ministry: number;
	unit: number;
	governorate: number;
	center: number;
	village: number;
	follower: number;
	name: string;
	address: string;
	manager: string;
	area: number;
	headquarterType: number;
	telephone: number;
	officeType: number;
	constructor(arg?: MinistryOfSolidarityAndCommunications) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
