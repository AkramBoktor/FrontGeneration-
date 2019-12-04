
 export class SampleResultForTheWorkOfOthers {
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
	measruingUnit: number;
	statementType: number;
	age: string;
	sampleMatch: number;
	constructor(arg?: SampleResultForTheWorkOfOthers) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
