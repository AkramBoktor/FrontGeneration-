
 export class DocumentsFolder {
    id: number;
    
	branchCode: number;
	fileNumber: string;
	entityType: number;
	entityCode: number;
	entityName: string;
	lawsuitNumber: string;
	year: Date;
	documentCode: number;
	documentStatement: string;
	constructor(arg?: DocumentsFolder) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
