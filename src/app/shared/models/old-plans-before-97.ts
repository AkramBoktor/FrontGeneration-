
 export class OldPlansBefore97 {
    id: number;
    
	governorate: number;
	school: string;
	constructionType: number;
	extension: string;
	primaryDeliveryDate: Date;
	pLanYear: string;
	constructor(arg?: OldPlansBefore97) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
