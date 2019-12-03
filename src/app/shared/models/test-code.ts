
 export class TestCode {
    id: number;
    
	basicMaterialCode: string;
	subMaterialCode: string;
	testCode: string;
	testName: string;
	hasAge: number;
	priceRelationship: number;
	testPrice: string;
	constructor(arg?: TestCode) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
