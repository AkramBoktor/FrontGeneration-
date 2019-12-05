import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding } from 'app/shared/models/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building';

@Injectable()

export class ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService extends DataService<ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding> {
    constructor(http: HttpClient) {
        super('elementsofthemeasureditemsduetotheweightsfactorofabuilding', http);
    }
}

