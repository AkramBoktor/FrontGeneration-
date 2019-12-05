import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DefiningANewToilet } from 'app/shared/models/defining-a-new-toilet';

@Injectable()

export class DefiningANewToiletService extends DataService<DefiningANewToilet> {
    constructor(http: HttpClient) {
        super('defininganewtoilet', http);
    }
}

