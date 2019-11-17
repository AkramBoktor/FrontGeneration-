
 export class ExpropriationDataBeforeThePrimeMinisterDecision {
    id: number;
    
	branchCode: number;
	buildingCode: string;
	space: number;
	spaceBeforeRegulation: number;
	spaceAfterOrganization: number;
	typeOfRemoval: number;
	usePosition: string;
	dateOfTheConsultantSurveyReport: Date;
	pricePerSquareMeterOfLandConsultantReport: number;
	priceOfTheBuildingConsultantReportArea: number;
	totalSurveyReport: number;
	idIdealContracts: string;
	numberMortgagecontractsParagon: number;
	historyOfParableContracts: Date;
	thePricePerSquareMeterOfTheLandContracts: number;
	dateOfPracticeRecord: Date;
	pricePerMeterOfLandRecordOfPractice: number;
	initialCompensationAmount: number;
	initialCompensationCheckNumber: number;
	initialCompensationDate: Date;
	applicantHandRemoval: number;
	constructor(arg?: ExpropriationDataBeforeThePrimeMinisterDecision) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
