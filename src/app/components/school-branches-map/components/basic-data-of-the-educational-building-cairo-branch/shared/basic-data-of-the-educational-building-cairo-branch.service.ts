import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BasicDataOfTheEducationalBuildingCairoBranch } from 'app/shared/models/basic-data-of-the-educational-building-cairo-branch';

@Injectable()

export class BasicDataOfTheEducationalBuildingCairoBranchService extends DataService<BasicDataOfTheEducationalBuildingCairoBranch> {
    constructor(http: HttpClient) {
        super('basicdataoftheeducationalbuildingcairobranch', http);
    }
}

