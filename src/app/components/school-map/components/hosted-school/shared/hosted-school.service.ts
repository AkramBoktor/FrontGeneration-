import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { HostedSchool } from 'app/shared/models/hosted-school';

@Injectable()

export class HostedSchoolService extends DataService<HostedSchool> {
    constructor(http: HttpClient) {
        super('hostedschool', http);
    }
}

