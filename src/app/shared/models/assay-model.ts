
 export class AssayModel {
    id: number;
    
	code: string;
	name: string;
	modelType: number;
	constructor(arg?: AssayModel) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
