import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Organization } from 'app/shared/models/organization';

@Injectable()

export class OrganizationService extends DataService<Organization> {
    constructor(http: HttpClient) {
        super('organization', http);
    }
}

