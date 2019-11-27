
 export class AddExtensionsOnConstructionPlan {
    id: number;
    
	buildingCode: string;
	planYear: string;
	branch: number;
	region: number;
	constructionType: number;
	extensionSerial: string;
	constructor(arg?: AddExtensionsOnConstructionPlan) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
