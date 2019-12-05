import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TheMainRoads } from 'app/shared/models/the-main-roads';

@Injectable()

export class TheMainRoadsService extends DataService<TheMainRoads> {
    constructor(http: HttpClient) {
        super('themainroads', http);
    }
}

