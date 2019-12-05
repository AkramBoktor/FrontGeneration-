
 export class TenderData {
    id: number;
    
	offeringType: number;
	bidNumber: string;
	project: string;
	company: string;
	insuranceValue: number;
	paymentMethod: number;
	insuranceNumber: string;
	assayValue: number;
	tenderTotalValue: number;
	tenderDurationinMonths: number;
	taxDescription: number;
	tenderDate: Date;
	gearStatus: number;
	awardValue: number;
	batchRatio: number;
	tenderNumber: string;
	bounsRate: number;
	valueAfterPractice: number;
	highestPriceValue: number;
	lowestPriceValue: number;
	assumptions: string;
	constructor(arg?: TenderData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
