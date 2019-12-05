
 export class DataWithdrawalNote {
    id: number;
    
	offeringType: number;
	offeringNumber: string;
	offeringName: string;
	buildingNumber: number;
	contractorCode: string;
	noteNumber: number;
	activityCode: number;
	constructionType: number;
	stopDate: Date;
	constructor(arg?: DataWithdrawalNote) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
