
 export class FollowupSessions {
    id: number;
    
	branchCode: number;
	fileNumber: string;
	entityType: number;
	entityCode: number;
	entityName: string;
	lawsuitNumber: string;
	year: Date;
	courtCode: number;
	chamberType: number;
	sessionDate: Date;
	decisionCode: string;
	nextSessionDate: Date;
	constructor(arg?: FollowupSessions) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
