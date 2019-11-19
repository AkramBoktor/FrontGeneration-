
 export class FinalClearanceCycle {
	id: number;
	engineerCode: string;
    buildingName: string;
	buildingCode: string;
	schoolName: string;
	governorate: number;
	bidNumber: number;
	offeringType: number;
	contractorCode: string;
	contractorName: string;
	employeeCode: string;
	engineerName: string;
	primaryDeliveryDate: Date;
	constructionType: number;
	incomingDate: Date;
	numberOfTimesReceived: number;
	portfolioNumber: number;
	approvalsNumber: number;
	referenceNumber: string;
	referencesName: string;
	abstractPosition: number;
	departureTechnicalOfficeDate: Date;
	exchangeAuthoritiesDate: Date;
	outboundNumber: number;
	constructor(arg?: FinalClearanceCycle) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
