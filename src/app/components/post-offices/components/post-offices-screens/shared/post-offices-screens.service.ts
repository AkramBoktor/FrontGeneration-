import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PostOfficesScreens } from 'app/shared/models/post-offices-screens';

@Injectable()

export class PostOfficesScreensService extends DataService<PostOfficesScreens> {
    constructor(http: HttpClient) {
        super('postofficesscreens', http);
    }
}

