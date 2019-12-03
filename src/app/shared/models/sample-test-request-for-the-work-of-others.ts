
 export class SampleTestRequestForTheWorkOfOthers {
    id: number;
    
	serialRequestTest: string;
	contractorCode: string;
	sampleTested: number;
	samplesNumber: number;
	educationalBuildingNumber: number;
	supplement: number;
	laboratoryCode: number;
	paidAmount: number;
	branchCode: number;
	typeOfReceiptOrCheck: number;
	receiptOrCheckNumber: string;
	dateOfReceiptOrCheck: Date;
	projectCode: string;
	constructor(arg?: SampleTestRequestForTheWorkOfOthers) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
