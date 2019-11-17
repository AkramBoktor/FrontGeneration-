import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SmoothData } from 'app/shared/models/smooth-data';

@Injectable()

export class SmoothDataService extends DataService<SmoothData> {
    constructor(http: HttpClient) {
        super('smoothdata', http);
    }
}

