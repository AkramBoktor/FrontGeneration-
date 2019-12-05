
 export class TheCodesAndNamesOfTheCases {
    id: number;
    
	statusCode: number;
	statusName: string;
	constructor(arg?: TheCodesAndNamesOfTheCases) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
