
 export class SampleTestRequest {
    id: number;
    
	serialRequestTest: string;
	testRequestType: number;
	sampleTestedType: number;
	supplier: string;
	testdemand: number;
	sampleTested: number;
	samplesNumber: number;
	educationalBuildingNumber: string;
	supplement: string;
	offeringTypeCode: number;
	laboratoryCode: number;
	bidNumber: string;
	branchCode: number;
	paidAmount: string;
	constructor(arg?: SampleTestRequest) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
