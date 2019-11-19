
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PostOfficesScreens } from 'app/shared/models/post-offices-screens';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PostOfficesScreensEditComponent } from '../post-offices-screens-edit/post-offices-screens-edit.component';
import { PostOfficesScreensNewComponent } from '../post-offices-screens-new/post-offices-screens-new.component';
import { PostOfficesScreensViewComponent } from '../post-offices-screens-view/post-offices-screens-view.component';
import { PostOfficesScreensService } from '../shared/post-offices-screens.service';

@Component({
  selector: 'app-post-offices-screens-list',
  templateUrl: './post-offices-screens-list.component.html',
  styleUrls: ['./post-offices-screens-list.component.scss'],
  providers: []
})

export class PostOfficesScreensListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private villagesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
districtSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('district', { static: true }) DistrictSelectComponent: MaterialSelectComponent;

  
  @Input() selectedPostOfficesScreens: PostOfficesScreens;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الرقم التعريفي', field: 'identityNumber' }),
	new GridColumnOptions({ headerName: 'س', field: 'x' }),
	new GridColumnOptions({ headerName: 'ص', field: 'y' }),
	new GridColumnOptions({ headerName: 'ز', field: 'z' }),
	new GridColumnOptions({ headerName: 'مكتب', field: 'office' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'الحي', field: 'district' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PostOfficesScreensViewComponent,
    editDialogClassType: PostOfficesScreensEditComponent,
    newDialogClassType: PostOfficesScreensNewComponent,
  });
    constructor(
        injector: Injector,
        public postOfficesScreensService: PostOfficesScreensService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPostOfficesScreens = new PostOfficesScreens();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.districtSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحي',
	});


    this.searchForm = this.formBuilder.group({
     	identityNumber : [],
	x : [],
	y : [],
	z : [],
	office : [],
	governorate : [],
	district : []
    });

     
  }

  getPostOfficesScreensPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PostOfficesScreens[]> => {
    return this.postOfficesScreensService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.postOfficesScreensService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
this.villagesService = new LookupService('villages', this.http);
  }
}

