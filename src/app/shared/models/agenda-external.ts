
 export class AgendaExternal {
    id: number;
    
	phoneNumber: string;
	email: string;
	newThirdParty: string;
	newExternalJob: string;
	externalemployeename: string;
	constructor(arg?: AgendaExternal) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
