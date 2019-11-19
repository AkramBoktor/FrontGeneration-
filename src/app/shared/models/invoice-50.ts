
 export class Invoice50 {
    id: number;
    
	offeringType: number;
	bidNumber: number;
	school: string;
	governorate: number;
	contractorCode: string;
	abstractNumber: number;
	contractualValue: number;
	extractType: number;
	executionDuration: number;
	abstractPosition: string;
	advancePayment: number;
	receiptDate: Date;
	abstractWorksStartDate: Date;
	primaryReceiptDate: Date;
	abstractWorksEndDate: Date;
	fineValue: number;
	disbursementRate: number;
	totalValue: number;
	paymentAmount: number;
	previousBalance: string;
	oldSpent: number;
	advanceBalance: number;
	abstractValue: number;
	netAbstract: number;
	prepaymentDiscount: number;
	registrationDate: Date;
	paymentRate: number;
	requestingAreaNumber: number;
	serialForm: number;
	constructor(arg?: Invoice50) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
