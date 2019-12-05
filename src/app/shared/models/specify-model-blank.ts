
 export class SpecifyModelBlank {
    id: number;
    
	modelCode: string;
	modelType: number;
	educationalStage: number;
	floorNumber: string;
	spaceCode: number;
	count: string;
	constructor(arg?: SpecifyModelBlank) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
