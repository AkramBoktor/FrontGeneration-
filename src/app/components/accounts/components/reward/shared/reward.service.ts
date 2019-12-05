import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Reward } from 'app/shared/models/reward';

@Injectable()

export class RewardService extends DataService<Reward> {
    constructor(http: HttpClient) {
        super('reward', http);
    }
}

