import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ElectricityWorks } from 'app/shared/models/electricity-works';

@Injectable()

export class ElectricityWorksService extends DataService<ElectricityWorks> {
    constructor(http: HttpClient) {
        super('electricityworks', http);
    }
}

