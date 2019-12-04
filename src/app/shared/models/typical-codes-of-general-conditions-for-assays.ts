
 export class TypicalCodesOfGeneralConditionsForAssays {
    id: number;
    
	conditionCode: string;
	conditionName: string;
	constructor(arg?: TypicalCodesOfGeneralConditionsForAssays) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
