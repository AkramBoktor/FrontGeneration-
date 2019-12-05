import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ElementsOfAssayItemsForWeightsFactorOfABuilding } from 'app/shared/models/elements-of-assay-items-for-weights-factor-of-a-building';

@Injectable()

export class ElementsOfAssayItemsForWeightsFactorOfABuildingService extends DataService<ElementsOfAssayItemsForWeightsFactorOfABuilding> {
    constructor(http: HttpClient) {
        super('elementsofassayitemsforweightsfactorofabuilding', http);
    }
}

