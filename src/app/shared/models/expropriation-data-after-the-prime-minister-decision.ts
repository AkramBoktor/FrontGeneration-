
 export class ExpropriationDataAfterThePrimeMinisterDecision {
    id: number;
    
	branchCode: number;
	buildingCode: string;
	resolutionNumber: number;
	dateOfBecision: Date;
	numberOfPublicationInTheOfficialGazette: string;
	dateOfPublicationInTheOfficialGazette: Date;
	educationProject: number;
	theNumberOfOwnersInThePresentationStatements: number;
	thePriceOfAMeterInTheSupplyStatements: number;
	dateFromThePresentationLists: Date;
	dateToOfThePresentationStatements: Date;
	numberOfSalesForms: number;
	constructor(arg?: ExpropriationDataAfterThePrimeMinisterDecision) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
