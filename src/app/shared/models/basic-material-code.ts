
 export class BasicMaterialCode {
    id: number;
    
	basicMaterialCode: string;
	basicMaterialName: string;
	constructor(arg?: BasicMaterialCode) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
