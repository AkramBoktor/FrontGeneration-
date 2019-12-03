
 export class SampleTestData {
    id: number;
    
	basicMaterialCode: string;
	subMaterialCode: string;
	testCode: string;
	statementTestingName: string;
	statementValueNoMoreThan: string;
	statementValueNotLessThan: string;
	measruingUnit: number;
	constructor(arg?: SampleTestData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
