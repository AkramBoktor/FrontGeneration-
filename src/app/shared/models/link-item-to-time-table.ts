
 export class LinkItemToTimeTable {
    id: number;
    
	itemCode: string;
	itemName: string;
	activityCode: string;
	activityName: string;
	constructor(arg?: LinkItemToTimeTable) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
