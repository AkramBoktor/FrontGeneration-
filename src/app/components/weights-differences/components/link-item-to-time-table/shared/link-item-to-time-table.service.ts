import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LinkItemToTimeTable } from 'app/shared/models/link-item-to-time-table';

@Injectable()

export class LinkItemToTimeTableService extends DataService<LinkItemToTimeTable> {
    constructor(http: HttpClient) {
        super('linkitemtotimetable', http);
    }
}

