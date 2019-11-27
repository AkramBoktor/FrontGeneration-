import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MemoirsOfTransgression } from 'app/shared/models/memoirs-of-transgression';

@Injectable()

export class MemoirsOfTransgressionService extends DataService<MemoirsOfTransgression> {
    constructor(http: HttpClient) {
        super('memoirsoftransgression', http);
    }
}

