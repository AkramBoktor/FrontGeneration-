import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SpecifyModelBlank } from 'app/shared/models/specify-model-blank';

@Injectable()

export class SpecifyModelBlankService extends DataService<SpecifyModelBlank> {
    constructor(http: HttpClient) {
        super('specifymodelblank', http);
    }
}

