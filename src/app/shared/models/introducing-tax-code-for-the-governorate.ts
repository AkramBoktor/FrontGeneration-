
 export class IntroducingTaxCodeForTheGovernorate {
    id: number;
    
	governorateCode: number;
	mamoriaCode: string;
	mamoriaName: string;
	constructor(arg?: IntroducingTaxCodeForTheGovernorate) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
