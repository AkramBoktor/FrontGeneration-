
 export class DefiningANewToilet {
    id: number;
    
	toiletCode: number;
	toiletModel: number;
	productionDate: Date;
	manufacturerCode: string;
	constructor(arg?: DefiningANewToilet) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
