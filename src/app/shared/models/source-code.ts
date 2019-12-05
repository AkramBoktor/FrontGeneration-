
 export class SourceCode {
    id: number;
    
	code: string;
	name: string;
	constructor(arg?: SourceCode) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
