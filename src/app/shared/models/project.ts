
 export class Project {
    id: number;
    
	projectCode: string;
	projectDesc: string;
	constructor(arg?: Project) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
