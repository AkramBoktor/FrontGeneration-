
 export class SpecializationData {
    id: number;
    
	fiscalYear: Date;
	administrationOrRegion: number;
	product: string;
	allocated: string;
	spent: string;
	constructor(arg?: SpecializationData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
