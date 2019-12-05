
 export class EnvelopesOpennigCommetyMembersData {
    id: number;
    
	offeringType: number;
	bidNumber: string;
	serialMember: string;
	memberType: number;
	memberName: string;
	constructor(arg?: EnvelopesOpennigCommetyMembersData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
