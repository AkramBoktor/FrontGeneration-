
 export class PlanDataBefore1997and1998 {
    id: number;
    
	governorate: number;
	schoolNumber: string;
	schoolName: string;
	constructionType: number;
	extension: string;
	primaryDelivaryDate: Date;
	planYear: string;
	constructor(arg?: PlanDataBefore1997and1998) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
