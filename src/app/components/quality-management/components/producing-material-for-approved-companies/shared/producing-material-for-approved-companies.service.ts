import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ProducingMaterialForApprovedCompanies } from 'app/shared/models/producing-material-for-approved-companies';

@Injectable()

export class ProducingMaterialForApprovedCompaniesService extends DataService<ProducingMaterialForApprovedCompanies> {
    constructor(http: HttpClient) {
        super('producingmaterialforapprovedcompanies', http);
    }
}

