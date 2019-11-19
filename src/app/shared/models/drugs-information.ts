
 export class DrugsInformation  {
    id: number;
    
	drugName: string;
	drugCode: string;
	quantity: string;
	supplier: string;
	storagePlace: string;
	constructor(arg?: DrugsInformation ) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
