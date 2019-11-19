
 export class ExternalJobType {
    id: number;
    
	eexternaljobcode: string;
	externaljobname: string;
	constructor(arg?: ExternalJobType) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
