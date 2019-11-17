
 export class ReturnDocumentBookWithBorrowerNumber {
    id: number;
    
	borrowerNumber: string;
	administration: number;
	jobBorrower: number;
	bookNumber: string;
	receiptNumber: string;
	defaultReturnDate: Date;
	returnBookDate: Date;
	loanDuration: string;
	loanStartDate: Date;
	constructor(arg?: ReturnDocumentBookWithBorrowerNumber) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
