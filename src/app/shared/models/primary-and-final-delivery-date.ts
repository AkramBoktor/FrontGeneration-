
 export class PrimaryAndFinalDeliveryDate {
    id: number;
    
	projectCode: string;
	constructionType: number;
	primaryDeliveryDate: Date;
	deliveryType: number;
	finalDeliveryDate: Date;
	constructor(arg?: PrimaryAndFinalDeliveryDate) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
