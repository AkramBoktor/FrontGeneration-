
 export class Invoice50 {
    id: number;
    
	offeringType: number;
	bidNumber: string;
	school: string;
	governorate: number;
	contractorCode: string;
	abstractNumber: string;
	contractualValue: string;
	extractType: number;
	executionDuration: string;
	abstractPosition: string;
	advancePayment: string;
	receiptDate: Date;
	abstractWorksStartDate: Date;
	primaryReceiptDate: Date;
	abstractWorksEndDate: Date;
	fineValue: string;
	disbursementRate: string;
	totalValue: string;
	paymentAmount: string;
	previousBalance: string;
	oldSpent: string;
	advanceBalance: string;
	abstractValue: string;
	netAbstract: string;
	prepaymentDiscount: string;
	registrationDate: Date;
	paymentRate: string;
	requestingAreaNumber: string;
	serialForm: string;
	constructor(arg?: Invoice50) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
