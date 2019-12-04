
 export class MaterialType {
    id: number;
    
	code: string;
	name: string;
	constructor(arg?: MaterialType) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
