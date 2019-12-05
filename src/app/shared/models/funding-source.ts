
 export class FundingSource {
    id: number;
    
	sourceCategory: number;
	sourceCode: string;
	sourceName: string;
	fundingStart: Date;
	fundingEnd: Date;
	suggesteValue: string;
	dateValue: string;
	currentYearValue: string;
	constructor(arg?: FundingSource) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
