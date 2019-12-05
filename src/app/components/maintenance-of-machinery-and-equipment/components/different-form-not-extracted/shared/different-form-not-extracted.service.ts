import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DifferentFormNotExtracted } from 'app/shared/models/different-form-not-extracted';

@Injectable()

export class DifferentFormNotExtractedService extends DataService<DifferentFormNotExtracted> {
    constructor(http: HttpClient) {
        super('differentformnotextracted', http);
    }
}

