
 export class ConformationsAndTheResultOfTheCorrespondingConcreteMixture {
    id: number;
    
	orderNumber: string;
	sampleSpecificationCode: string;
	basicArticle: string;
	subArticle: string;
	calledTesting: string;
	serialSample: number;
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
	newSampleOrderNumber: string;
	entry: string;
	testResult: string;
	constructor(arg?: ConformationsAndTheResultOfTheCorrespondingConcreteMixture) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
