
 export class NoteSeenByTheChemistryLaboratory {
    id: number;
    
	barcodeNumber: string;
	notes: string;
	constructor(arg?: NoteSeenByTheChemistryLaboratory) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
