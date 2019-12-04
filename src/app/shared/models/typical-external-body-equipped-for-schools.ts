
 export class TypicalExternalBodyEquippedForSchools {
    id: number;
    
	supplierName: string;
	supplierCode: string;
	constructor(arg?: TypicalExternalBodyEquippedForSchools) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
