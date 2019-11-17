
 export class ContractedEmployeeDataFirstTime {
    id: number;
    
	approvalNumber: string;
	approvalDate: Date;
	employeeCode: string;
	employeeName: string;
	employeeAddress: string;
	sectionCenter: number;
	governorate: number;
	birthDate: Date;
	birthPlace: number;
	iDNumber: string;
	iDType: number;
	releaseDate: Date;
	issuer: number;
	nationality: number;
	religion: number;
	socialStatus: number;
	gender: number;
	lastQualification: number;
	receivedDate: Date;
	specialization: string;
	motherName: string;
	telephoneNumber: string;
	contractStartingDate: Date;
	contractEndDate: Date;
	durationPeriod: string;
	contractAmount: string;
	constructor(arg?: ContractedEmployeeDataFirstTime) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
