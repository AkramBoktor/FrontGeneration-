import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExtractionOfTemporaryCardCode } from 'app/shared/models/extraction-of-temporary-card-code';

@Injectable()

export class ExtractionOfTemporaryCardCodeService extends DataService<ExtractionOfTemporaryCardCode> {
    constructor(http: HttpClient) {
        super('extractionoftemporarycardcode', http);
    }
}

