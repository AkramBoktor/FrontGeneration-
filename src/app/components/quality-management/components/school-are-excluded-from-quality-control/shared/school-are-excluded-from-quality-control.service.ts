import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SchoolAreExcludedFromQualityControl } from 'app/shared/models/school-are-excluded-from-quality-control';

@Injectable()

export class SchoolAreExcludedFromQualityControlService extends DataService<SchoolAreExcludedFromQualityControl> {
    constructor(http: HttpClient) {
        super('schoolareexcludedfromqualitycontrol', http);
    }
}

