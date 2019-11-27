import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MaterialType } from 'app/shared/models/material-type';

@Injectable()

export class MaterialTypeService extends DataService<MaterialType> {
    constructor(http: HttpClient) {
        super('materialtype', http);
    }
}

