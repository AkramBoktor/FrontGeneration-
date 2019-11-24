
 export class StatementsOfSensors {
    id: number;
    
	schoolNumber: number;
	recordDate: Date;
	administrator: number;
	alternativeNumber: number;
	floorsNumbers: string;
	backfill: number;
	drillingDepth: number;
	flutterDrill: number;
	qualitySubstitution: number;
	substitutionDepth: number;
	qualityFoundations: number;
	soilEffort: number;
	qualityCement: number;
	notes: string;
	constructor(arg?: StatementsOfSensors) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
