
 export class DataLimitsAcceptAndRejectForSample {
    id: number;
    
	basicMaterialCode: string;
	subMaterialCode: string;
	testCode: string;
	testStatementName: string;
	noMoreThanStatementvalue: number;
	notLessThanStatementValue: number;
	measruingUnitStatement: number;
	statementType: number;
	constructor(arg?: DataLimitsAcceptAndRejectForSample) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
