import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CastingDataForSampleForTheWorkOfOthers } from 'app/shared/models/casting-data-for-sample-for-the-work-of-others';

@Injectable()

export class CastingDataForSampleForTheWorkOfOthersService extends DataService<CastingDataForSampleForTheWorkOfOthers> {
    constructor(http: HttpClient) {
        super('castingdataforsamplefortheworkofothers', http);
    }
}

