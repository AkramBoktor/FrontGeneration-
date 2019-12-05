
 export class FinalClearanceCycle {
    id: number;
    
	buildingCode: string;
	schoolName: string;
	governorate: number;
	bidNumber: string;
	offeringType: number;
	contractorCode: string;
	contractorName: string;
	engineerCode: string;
	engineerName: string;
	primaryDeliveryDate: Date;
	constructionType: number;
	incomingDate: Date;
	numberOfTimesReceived: string;
	portfolioNumber: string;
	approvalsNumber: string;
	referenceCode: string;
	referencesName: string;
	abstractPosition: number;
	departureTechnicalOfficeDate: Date;
	exchangeAuthoritiesDate: Date;
	outboundNumber: string;
	constructor(arg?: FinalClearanceCycle) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
