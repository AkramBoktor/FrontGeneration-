
 export class SupplementaryRecord {
    id: number;
    
	recordNumber: string;
	offeringType: number;
	bidNumber: string;
	tenderNumber: number;
	contractorCode: string;
	companyName: string;
	school: number;
	advancePayment: number;
	assayValue: number;
	tenderTotalValue: number;
	bonusProvided: number;
	durationExecution: number;
	plenipotentiary: string;
	classificationDegree: number;
	negotiationEndedBouns: number;
	downPaymentRatio: number;
	bouns: number;
	value: number;
	contributionsAfterNegotiation: number;
	reason: string;
	constructor(arg?: SupplementaryRecord) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
