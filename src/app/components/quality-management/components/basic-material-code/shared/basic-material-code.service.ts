import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BasicMaterialCode } from 'app/shared/models/basic-material-code';

@Injectable()

export class BasicMaterialCodeService extends DataService<BasicMaterialCode> {
    constructor(http: HttpClient) {
        super('basicmaterialcode', http);
    }
}

