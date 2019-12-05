
 export class DataEntryForm129AtTheManagementLevel {
    id: number;
    
	administrationOrBranch: number;
	incomingMonth: Date;
	incomingNumber: string;
	constructor(arg?: DataEntryForm129AtTheManagementLevel) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
