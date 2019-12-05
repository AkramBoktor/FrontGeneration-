import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BasicDataOfThePlot } from 'app/shared/models/basic-data-of-the-plot';

@Injectable()

export class BasicDataOfThePlotService extends DataService<BasicDataOfThePlot> {
    constructor(http: HttpClient) {
        super('basicdataoftheplot', http);
    }
}

