import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { IntroducingSocialGrantsToParticipantsOfAssociation } from 'app/shared/models/introducing-social-grants-to-participants-of-association';

@Injectable()

export class IntroducingSocialGrantsToParticipantsOfAssociationService extends DataService<IntroducingSocialGrantsToParticipantsOfAssociation> {
    constructor(http: HttpClient) {
        super('introducingsocialgrantstoparticipantsofassociation', http);
    }
}

