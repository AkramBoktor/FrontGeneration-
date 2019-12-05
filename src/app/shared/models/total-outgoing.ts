
 export class TotalOutgoing {
    id: number;
    
	schoolNumber: string;
	schoolName: string;
	contractor: string;
	contractorNmae: string;
	bidNumber: string;
	totalOutgoing: string;
	constructor(arg?: TotalOutgoing) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
