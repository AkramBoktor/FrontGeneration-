
 export class WeightsFactor {
    id: number;
    
	buildingCode: string;
	offeringType: number;
	tenderNumber: string;
	tenderName: string;
	contractorCode: string;
	supplementSeries: string;
	itemCode: number;
	dateOfOpeningTechnicalAttribution: Date;
	assayPriceCategory: string;
	elementCode: number;
	ratioOfWeightsCoefficient: string;
	constructor(arg?: WeightsFactor) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
