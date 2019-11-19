import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BasicDataLogging } from 'app/shared/models/basic-data-logging';

@Injectable()

export class BasicDataLoggingService extends DataService<BasicDataLogging> {
    constructor(http: HttpClient) {
        super('basicdatalogging', http);
    }
}

