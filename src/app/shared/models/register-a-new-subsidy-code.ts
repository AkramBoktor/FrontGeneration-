
 export class RegisterANewSubsidyCode {
    id: number;
    
	subsidyCode: string;
	subsidyName: string;
	subsidyAmount: number;
	constructor(arg?: RegisterANewSubsidyCode) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
