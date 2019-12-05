
 export class SampleResult {
    id: number;
    
	orderNumber: string;
	sampleSpecificationCode: string;
	basicArticle: string;
	subArticle: string;
	calledTesting: string;
	serialSample: string;
	sampleTestDate: Date;
	laboratoryEngineer: string;
	laboratory: number;
	testStatementCode: string;
	statementTestName: string;
	statementResult: string;
	sampleMatch: number;
	measruingUnit: number;
	statementType: number;
	age: string;
	constructor(arg?: SampleResult) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
