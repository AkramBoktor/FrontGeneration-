
 export class MachineRelatedTest {
    id: number;
    
	machineCode: string;
	testCode: string;
	constructor(arg?: MachineRelatedTest) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
