
 export class ModifyThePricesOfSchoolsForPricing2018 {
    id: number;
    
	schoolNumber: string;
	extensionCode: string;
	constructionType: number;
	pLanYear: string;
	constructor(arg?: ModifyThePricesOfSchoolsForPricing2018) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
