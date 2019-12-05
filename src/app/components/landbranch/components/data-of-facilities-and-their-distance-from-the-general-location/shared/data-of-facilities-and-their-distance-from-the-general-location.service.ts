import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation } from 'app/shared/models/data-of-facilities-and-their-distance-from-the-general-location';

@Injectable()

export class DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService extends DataService<DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation> {
    constructor(http: HttpClient) {
        super('dataoffacilitiesandtheirdistancefromthegenerallocation', http);
    }
}

