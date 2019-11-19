import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DeliveryWarehousesToKeepers } from 'app/shared/models/delivery-warehouses-to-keepers';

@Injectable()

export class DeliveryWarehousesToKeepersService extends DataService<DeliveryWarehousesToKeepers> {
    constructor(http: HttpClient) {
        super('deliverywarehousestokeepers', http);
    }
}

