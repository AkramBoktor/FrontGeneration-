import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TypicalAssayData } from 'app/shared/models/typical-assay-data';

@Injectable()

export class TypicalAssayDataService extends DataService<TypicalAssayData> {
    constructor(http: HttpClient) {
        super('typicalassaydata', http);
    }
}

