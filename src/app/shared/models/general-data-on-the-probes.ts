
 export class GeneralDataOnTheProbes {
    id: number;
    
	schoolName: number;
	governorate: number;
	coordinatesX: string;
	coordinatesY: string;
	groundLevel: string;
	totalSaltsPercentage: string;
	carbonateRatio: string;
	chloridesRatio: string;
	sulfateRatio: string;
	foundationDepth: string;
	foundationEffort: string;
	foundationsProposedType: string;
	executingAgency: number;
	constructor(arg?: GeneralDataOnTheProbes) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
