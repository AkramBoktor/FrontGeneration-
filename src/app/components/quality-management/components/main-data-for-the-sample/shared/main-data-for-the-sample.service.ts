import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MainDataForTheSample } from 'app/shared/models/main-data-for-the-sample';

@Injectable()

export class MainDataForTheSampleService extends DataService<MainDataForTheSample> {
    constructor(http: HttpClient) {
        super('maindataforthesample', http);
    }
}

