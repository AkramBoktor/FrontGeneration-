
 export class PrivateSchoolTrafficCommittee {
    id: number;
    
	schoolCode: string;
	passageDate: Date;
	noteCode: string;
	measures: string;
	constructor(arg?: PrivateSchoolTrafficCommittee) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
