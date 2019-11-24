import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Area } from 'app/shared/models/area';

@Injectable()

export class AreaService extends DataService<Area> {
    constructor(http: HttpClient) {
        super('area', http);
    }
}

