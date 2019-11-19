
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Organization } from 'app/shared/models/organization';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrganizationEditComponent } from '../organization-edit/organization-edit.component';
import { OrganizationNewComponent } from '../organization-new/organization-new.component';
import { OrganizationViewComponent } from '../organization-view/organization-view.component';
import { OrganizationService } from '../shared/organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
  providers: []
})

export class OrganizationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];
  private sectorCodesService: LookupService;

  
sectorSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sector', { static: true }) SectorSelectComponent: MaterialSelectComponent;

  
  @Input() selectedOrganization: Organization;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المنشأة', field: 'organizationNumber' }),
	new GridColumnOptions({ headerName: 'اسم الموظف', field: 'organizationName' }),
	new GridColumnOptions({ headerName: 'القطاع', field: 'sector' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: OrganizationViewComponent,
    editDialogClassType: OrganizationEditComponent,
    newDialogClassType: OrganizationNewComponent,
  });
    constructor(
        injector: Injector,
        public organizationService: OrganizationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedOrganization = new Organization();

    
	this.sectorSelectOptions = new MaterialSelectOptions({
	 data: this.sectorCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القطاع',
	});


    this.searchForm = this.formBuilder.group({
     	organizationNumber : [],
	organizationName : [],
	sector : []
    });

     
  }

  getOrganizationsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Organization[]> => {
    return this.organizationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.organizationService.delete(param.data.id)
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
    this.sectorCodesService = new LookupService('sectorcodes', this.http);
  }
}

