
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { PrimaryAndFinalDeliveryDate } from 'app/shared/models/primary-and-final-delivery-date';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PrimaryAndFinalDeliveryDateEditComponent } from '../primary-and-final-delivery-date-edit/primary-and-final-delivery-date-edit.component';
import { PrimaryAndFinalDeliveryDateNewComponent } from '../primary-and-final-delivery-date-new/primary-and-final-delivery-date-new.component';
import { PrimaryAndFinalDeliveryDateViewComponent } from '../primary-and-final-delivery-date-view/primary-and-final-delivery-date-view.component';
import { PrimaryAndFinalDeliveryDateService } from '../shared/primary-and-final-delivery-date.service';

@Component({
  selector: 'app-primary-and-final-delivery-date-list',
  templateUrl: './primary-and-final-delivery-date-list.component.html',
  styleUrls: ['./primary-and-final-delivery-date-list.component.scss'],
  providers: []
})

export class PrimaryAndFinalDeliveryDateListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPrimaryAndFinalDeliveryDate: PrimaryAndFinalDeliveryDate;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المشروع', field: 'projectCode' }),
	new GridColumnOptions({ headerName: 'تاريخ تسليم ابتدائي', field: 'primaryDeliveryDate' }),
	new GridColumnOptions({ headerName: 'تاريخ تسليم نهائي', field: 'finalDeliveryDate' }),
	new GridColumnOptions({ headerName: 'نوع الإنشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع التسليم', field: 'deliveryType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PrimaryAndFinalDeliveryDateViewComponent,
    editDialogClassType: PrimaryAndFinalDeliveryDateEditComponent,
    newDialogClassType: PrimaryAndFinalDeliveryDateNewComponent,
  });
    constructor(
        injector: Injector,
        public primaryAndFinalDeliveryDateService: PrimaryAndFinalDeliveryDateService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPrimaryAndFinalDeliveryDate = new PrimaryAndFinalDeliveryDate();

    

    this.searchForm = this.formBuilder.group({
     	projectCode : [],
	projectDesc : []
    });

     
  }

  getPrimaryAndFinalDeliveryDatesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PrimaryAndFinalDeliveryDate[]> => {
    return this.primaryAndFinalDeliveryDateService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.primaryAndFinalDeliveryDateService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    
  }
}

