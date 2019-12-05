import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BarrierDataForThePlotOfLand } from 'app/shared/models/barrier-data-for-the-plot-of-land';

@Injectable()

export class BarrierDataForThePlotOfLandService extends DataService<BarrierDataForThePlotOfLand> {
    constructor(http: HttpClient) {
        super('barrierdatafortheplotofland', http);
    }
}

