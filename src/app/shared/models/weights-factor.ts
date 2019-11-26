
 export class WeightsFactor {
    id: number;
    
	buildingCode: string;
	offeringType: number;
	tenderName: string;
	contractorCode: string;
	supplementSeries: string;
	itemCode: string;
	dateOfOpeningTechnicalAttribution: Date;
	assayPriceCategory: string;
	elementCode: string;
	itemName: string;
	ratioOfWeightsCoefficient: string;
	constructor(arg?: WeightsFactor) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
