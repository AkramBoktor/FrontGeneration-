
 export class SubcategoryCode {
    id: number;
    
	subMaterialCode: string;
	subMaterialName: string;
	constructor(arg?: SubcategoryCode) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
