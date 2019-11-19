
 export class ContractorRankingData {
    id: number;
    
	offeringType: number;
	bidNumber: string;
	projectNumber: string;
	contractorCode: string;
	constructionType: number;
	ongoingBusinessTotalValue: string;
	classificationCode: number;
	classificationValueCode: number;
	classificationCardNumber: string;
	dateCardRating: Date;
	decision: number;
	reason: string;
	constructor(arg?: ContractorRankingData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
