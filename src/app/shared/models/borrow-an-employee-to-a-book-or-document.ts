
 export class BorrowAnEmployeeToABookOrDocument {
    id: number;
    
	bookNumber: string;
	receiptNumber: string;
	bookState: number;
	borrowerNumber: string;
	subAdministration: number;
	jobTitle: number;
	loanStartDate: Date;
	loanDuration: string;
	defaultReturnDate: Date;
	constructor(arg?: BorrowAnEmployeeToABookOrDocument) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
