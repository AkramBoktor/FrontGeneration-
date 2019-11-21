import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PlaygroundData } from 'app/shared/models/playground-data';

@Injectable()

export class PlaygroundDataService extends DataService<PlaygroundData> {
    constructor(http: HttpClient) {
        super('playgrounddata', http);
    }
}

