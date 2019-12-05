
 export class ExternalBodyEquippedForSchools {
    id: number;
    
	supplierName: string;
	supplierCode: string;
	constructor(arg?: ExternalBodyEquippedForSchools) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
