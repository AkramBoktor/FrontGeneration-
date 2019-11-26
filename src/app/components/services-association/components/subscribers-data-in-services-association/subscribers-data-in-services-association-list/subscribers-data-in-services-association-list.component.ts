
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscribersDataInServicesAssociation } from 'app/shared/models/subscribers-data-in-services-association';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscribersDataInServicesAssociationEditComponent } from '../subscribers-data-in-services-association-edit/subscribers-data-in-services-association-edit.component';
import { SubscribersDataInServicesAssociationNewComponent } from '../subscribers-data-in-services-association-new/subscribers-data-in-services-association-new.component';
import { SubscribersDataInServicesAssociationViewComponent } from '../subscribers-data-in-services-association-view/subscribers-data-in-services-association-view.component';
import { SubscribersDataInServicesAssociationService } from '../shared/subscribers-data-in-services-association.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscribers-data-in-services-association-list',
  templateUrl: './subscribers-data-in-services-association-list.component.html',
  styleUrls: ['./subscribers-data-in-services-association-list.component.scss'],
  providers: []
})

export class SubscribersDataInServicesAssociationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSubscribersDataInServicesAssociation: SubscribersDataInServicesAssociation;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: ' اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: ' رقم العضوية', field: 'membershipNo' }),
	new GridColumnOptions({ headerName: ' تاريخ الاشتراك', field: 'subscriptionDate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SubscribersDataInServicesAssociationViewComponent,
    editDialogClassType: SubscribersDataInServicesAssociationEditComponent,
    newDialogClassType: SubscribersDataInServicesAssociationNewComponent,
  });
    constructor(
        injector: Injector,
        public subscribersDataInServicesAssociationService: SubscribersDataInServicesAssociationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubscribersDataInServicesAssociation = new SubscribersDataInServicesAssociation();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	employeeName : [],
	membershipNo : [],
	subscriptionDate : []
    });

     
  }

  getSubscribersDataInServicesAssociationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubscribersDataInServicesAssociation[]> => {
    return this.subscribersDataInServicesAssociationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subscribersDataInServicesAssociationService.delete(param.data.id)
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

