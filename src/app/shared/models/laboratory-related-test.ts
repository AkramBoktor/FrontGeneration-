
 export class LaboratoryRelatedTest {
    id: number;
    
	basicMaterialCode: string;
	subMaterialCode: string;
	laboratoryCode: number;
	testCode: string;
	constructor(arg?: LaboratoryRelatedTest) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
