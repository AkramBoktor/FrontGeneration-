
 export class CodeOfVariousActivityOfApprovedCompanies {
    id: number;
    
	activityCode: string;
	activityName: string;
	constructor(arg?: CodeOfVariousActivityOfApprovedCompanies) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
