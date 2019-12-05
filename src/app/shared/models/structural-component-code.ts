
 export class StructuralComponentCode {
    id: number;
    
	elementCode: string;
	structuralElementName: string;
	constructor(arg?: StructuralComponentCode) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
