
 export class ProjectData {
    id: number;
    
	projectCode: string;
	projectName: string;
	constructor(arg?: ProjectData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
