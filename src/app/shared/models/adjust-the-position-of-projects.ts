
 export class AdjustThePositionOfProjects {
    id: number;
    
	buildingNumber: string;
	entryDate: Date;
	branch: number;
	extensionCode: string;
	pLanYear: Date;
	constructionType: number;
	positionCode: string;
	constructor(arg?: AdjustThePositionOfProjects) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
