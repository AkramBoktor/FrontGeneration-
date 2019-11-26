import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Level } from 'app/shared/models/level';

@Injectable()

export class LevelService extends DataService<Level> {
    constructor(http: HttpClient) {
        super('level', http);
    }
}

