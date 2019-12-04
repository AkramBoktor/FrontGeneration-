import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ConcreteMixtureDataForTheWorkOfOthers } from 'app/shared/models/concrete-mixture-data-for-the-work-of-others';

@Injectable()

export class ConcreteMixtureDataForTheWorkOfOthersService extends DataService<ConcreteMixtureDataForTheWorkOfOthers> {
    constructor(http: HttpClient) {
        super('concretemixturedatafortheworkofothers', http);
    }
}

