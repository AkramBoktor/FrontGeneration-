
 export class CastingDataForSampleForTheWorkOfOthers {
    id: number;
    
	constructionType: number;
	structuralElementName: string;
	castingHistory: Date;
	elementCode: number;
	testOrderNumber: string;
	constructor(arg?: CastingDataForSampleForTheWorkOfOthers) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
