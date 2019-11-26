
 export class IntroducingSocialGrantsToParticipantsOfAssociation {
    id: number;
    
	employeeCode: string;
	membershipNo: string;
	case: number;
	exchangeDate: Date;
	exchangeValue: number;
	deceasedName: string;
	constructor(arg?: IntroducingSocialGrantsToParticipantsOfAssociation) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
