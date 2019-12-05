
 export class TheNumberOfApplicationReceivedInTheSamplesHall {
    id: number;
    
	date: Date;
	orderNumber: string;
	basicMaterialCode: string;
	subMaterialCode: string;
	testCode: string;
	sampleTested: number;
	branchCode: number;
	constructor(arg?: TheNumberOfApplicationReceivedInTheSamplesHall) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
