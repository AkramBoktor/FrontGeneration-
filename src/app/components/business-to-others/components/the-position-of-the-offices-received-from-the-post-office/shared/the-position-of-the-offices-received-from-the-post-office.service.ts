import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ThePositionOfTheOfficesReceivedFromThePostOffice } from 'app/shared/models/the-position-of-the-offices-received-from-the-post-office';

@Injectable()

export class ThePositionOfTheOfficesReceivedFromThePostOfficeService extends DataService<ThePositionOfTheOfficesReceivedFromThePostOffice> {
    constructor(http: HttpClient) {
        super('thepositionoftheofficesreceivedfromthepostoffice', http);
    }
}

