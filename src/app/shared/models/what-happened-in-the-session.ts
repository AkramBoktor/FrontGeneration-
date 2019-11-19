
 export class WhatHappenedInTheSession {
    id: number;
    
	branchCode: number;
	fileNumber: string;
	entityType: number;
	entityCode: number;
	entityName: string;
	lawsuitNumber: string;
	year: Date;
	sessionEvents: string;
	constructor(arg?: WhatHappenedInTheSession) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
