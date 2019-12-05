import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BasicDataForTheYouthCenter } from 'app/shared/models/basic-data-for-the-youth-center';

@Injectable()

export class BasicDataForTheYouthCenterService extends DataService<BasicDataForTheYouthCenter> {
    constructor(http: HttpClient) {
        super('basicdatafortheyouthcenter', http);
    }
}

