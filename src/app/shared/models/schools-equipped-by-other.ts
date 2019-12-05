
 export class SchoolsEquippedByOther {
    id: number;
    
	equipmentType: number;
	provider: number;
	constructionPlanYear: string;
	schoolNumber: string;
	extensionNumber: string;
	constructionType: number;
	itemCode: number;
	itemName: string;
	quantity: string;
	constructor(arg?: SchoolsEquippedByOther) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
