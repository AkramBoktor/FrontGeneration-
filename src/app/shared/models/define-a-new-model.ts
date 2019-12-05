
 export class DefineANewModel {
    id: number;
    
	modelCode: string;
	modelName: string;
	constructor(arg?: DefineANewModel) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
