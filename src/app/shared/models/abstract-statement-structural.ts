
 export class AbstractStatementStructural {
    id: number;
    
	buildingCode: string;
	abstractNumber: string;
	contractorName: string;
	constructionType: number;
	offeringType: number;
	siteDeliveryDate: Date;
	planYear: string;
	bidNumber: string;
	endPrevious: Date;
	abstractType: number;
	businessEnd: Date;
	extensionNumber: string;
	workType: number;
	itemCode: number;
	itemName: string;
	contractQuantity: string;
	totalQuantity: string;
	constructor(arg?: AbstractStatementStructural) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
