import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { StructuralComponentCode } from 'app/shared/models/structural-component-code';

@Injectable()

export class StructuralComponentCodeService extends DataService<StructuralComponentCode> {
    constructor(http: HttpClient) {
        super('structuralcomponentcode', http);
    }
}

