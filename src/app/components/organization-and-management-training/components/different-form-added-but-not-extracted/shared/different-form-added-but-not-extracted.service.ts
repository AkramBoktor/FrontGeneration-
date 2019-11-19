import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DifferentFormAddedButNotExtracted } from 'app/shared/models/different-form-added-but-not-extracted';

@Injectable()

export class DifferentFormAddedButNotExtractedService extends DataService<DifferentFormAddedButNotExtracted> {
    constructor(http: HttpClient) {
        super('differentformaddedbutnotextracted', http);
    }
}

