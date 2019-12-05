
 export class NetworkBudgetObservationsData {
    id: number;
    
	landID: string;
	networkNoteTypeCode: number;
	borderCode: number;
	averageHeightValues: string;
	averageValuesDecline: string;
	constructor(arg?: NetworkBudgetObservationsData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
