import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixture } from 'app/shared/models/conformations-and-the-result-of-the-corresponding-concrete-mixture';

@Injectable()

export class ConformationsAndTheResultOfTheCorrespondingConcreteMixtureService extends DataService<ConformationsAndTheResultOfTheCorrespondingConcreteMixture> {
    constructor(http: HttpClient) {
        super('conformationsandtheresultofthecorrespondingconcretemixture', http);
    }
}

