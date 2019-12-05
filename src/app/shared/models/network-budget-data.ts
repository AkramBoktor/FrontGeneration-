
 export class NetworkBudgetData {
    id: number;
    
	landID: string;
	robertLevel: string;
	directionCode: number;
	directionDescription: string;
	constructor(arg?: NetworkBudgetData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
