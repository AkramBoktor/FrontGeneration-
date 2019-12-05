
 export class ConcreteMixtureDataForTheWorkOfOthers {
    id: number;
    
	cementUsed: number;
	laboratoryLanding: number;
	aggregatesSpecificWeight: number;
	dolomiteSpecificWeight: number;
	stonesSpecificWeight: number;
	sandSpecificWeight: number;
	dolomiteVolume: number;
	dolomiteWeight: number;
	sandWeightVolume: number;
	stonesVolume: number;
	sandVolume: number;
	sandWeight: number;
	waterVolume: number;
	waterWeight: number;
	cementBulk: number;
	cementWeight: number;
	mixtureType: number;
	orderNumber: number;
	stonesWeight: number;
	dolomiteWeightVolume: number;
	stonesWeightVolume: number;
	stonesCrush: number;
	sandGradientArea: number;
	dolomiteStones: number;
	constructor(arg?: ConcreteMixtureDataForTheWorkOfOthers) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
