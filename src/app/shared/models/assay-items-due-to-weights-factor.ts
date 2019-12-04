
 export class AssayItemsDueToWeightsFactor {
    id: number;
    
	buildingCode: string;
	buildingName: string;
	constructionType: number;
	extensionCode: string;
	yearPlan: Date;
	employmentType: number;
	sample: string;
	pricingYear: string;
	clause: number;
	constructor(arg?: AssayItemsDueToWeightsFactor) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
