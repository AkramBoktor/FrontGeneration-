import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SocialSolidarityFundCodes } from 'app/shared/models/social-solidarity-fund-codes';

@Injectable()

export class SocialSolidarityFundCodesService extends DataService<SocialSolidarityFundCodes> {
    constructor(http: HttpClient) {
        super('socialsolidarityfundcodes', http);
    }
}

