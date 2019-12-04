import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { NutritionDataForEducationalBuilding } from 'app/shared/models/nutrition-data-for-educational-building';

@Injectable()

export class NutritionDataForEducationalBuildingService extends DataService<NutritionDataForEducationalBuilding> {
    constructor(http: HttpClient) {
        super('nutritiondataforeducationalbuilding', http);
    }
}

