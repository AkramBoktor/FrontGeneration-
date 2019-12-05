
 export class SteelPriceCementOnThePriceList {
    id: number;
    
	pricingYear: string;
	materialType: number;
	price: string;
	constructor(arg?: SteelPriceCementOnThePriceList) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
