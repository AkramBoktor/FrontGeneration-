import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubscribersDataInServicesAssociation } from 'app/shared/models/subscribers-data-in-services-association';

@Injectable()

export class SubscribersDataInServicesAssociationService extends DataService<SubscribersDataInServicesAssociation> {
    constructor(http: HttpClient) {
        super('subscribersdatainservicesassociation', http);
    }
}

