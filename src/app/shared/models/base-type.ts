
 export class BaseType {
    id: number;
    
	code: string;
	name: string;
	constructor(arg?: BaseType) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
