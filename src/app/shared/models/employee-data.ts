
 export class EmployeeData {
    id: number;
    
	employeeName: string;
	currentJobDate: Date;
	levelDate: Date;
	employeeStatus: number;
	seniorityHistoryDate: Date;
	subAdministration: number;
	centralAdministration: number;
	receiptDate: Date;
	decisionDate: Date;
	decisionNumber: string;
	appointmentType: number;
	financialDegree: number;
	jobGroup: number;
	jobTitle: number;
	specialization: number;
	socialStatus: number;
	telephoneNumber: string;
	governorate: number;
	sectionCenter: number;
	employeeAddress: string;
	religion: number;
	nationality: number;
	releaseDate: Date;
	issuer: number;
	iDNumber: string;
	gender: number;
	motherName: string;
	birthPlace: number;
	lastFinancialDisclosure: Date;
	livingHelpedCost: string;
	employeeCode: string;
	approvalNumber: string;
	approvalDate: Date;
	birthDate: Date;
	iDType: number;
	contractStartingDate: Date;
	contractEndDate: Date;
	durationPeriod: string;
	contractAmount: string;
	constructor(arg?: EmployeeData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
