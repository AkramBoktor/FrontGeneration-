
 export class TheListsRequiredToEquipAllSchools {
    id: number;
    
	processingType: number;
	offeringType: number;
	bidNumber: string;
	listNumber: string;
	constructor(arg?: TheListsRequiredToEquipAllSchools) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
