
 export class SocialSolidarityFundCodes {
    id: number;
    
	codeType: string;
	statementCode: string;
	constructor(arg?: SocialSolidarityFundCodes) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
