import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SourceCode } from 'app/shared/models/source-code';

@Injectable()

export class SourceCodeService extends DataService<SourceCode> {
    constructor(http: HttpClient) {
        super('sourcecode', http);
    }
}

