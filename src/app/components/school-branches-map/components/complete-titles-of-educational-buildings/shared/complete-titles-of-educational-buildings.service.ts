import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CompleteTitlesOfEducationalBuildings } from 'app/shared/models/complete-titles-of-educational-buildings';

@Injectable()

export class CompleteTitlesOfEducationalBuildingsService extends DataService<CompleteTitlesOfEducationalBuildings> {
    constructor(http: HttpClient) {
        super('completetitlesofeducationalbuildings', http);
    }
}

