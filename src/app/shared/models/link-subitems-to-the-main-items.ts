
 export class LinkSubitemsToTheMainItems {
    id: number;
    
	mainIemNumber: number;
	subItemNumber: string;
	constructor(arg?: LinkSubitemsToTheMainItems) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
