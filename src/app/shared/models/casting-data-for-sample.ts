
 export class CastingDataForSample {
    id: number;
    
	testOrderNumber: string;
	elementCode: string;
	castingHistory: Date;
	structuralElementName: string;
	constructionType: number;
	constructor(arg?: CastingDataForSample) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
