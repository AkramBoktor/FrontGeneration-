import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EducationalBuildingData } from 'app/shared/models/educational-building-data';

@Injectable()

export class EducationalBuildingDataService extends DataService<EducationalBuildingData> {
    constructor(http: HttpClient) {
        super('educationalbuildingdata', http);
    }
}

