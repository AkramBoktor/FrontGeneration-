
 export class ExternalBodiesEquippedForSchools {
    id: number;
    
	supplierCode: string;
	supplierName: string;
	constructor(arg?: ExternalBodiesEquippedForSchools) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
