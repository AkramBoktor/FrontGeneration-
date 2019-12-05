
 export class ApprovalType {
    id: number;
    
	approvalCode: string;
	approvalName: string;
	constructor(arg?: ApprovalType) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
