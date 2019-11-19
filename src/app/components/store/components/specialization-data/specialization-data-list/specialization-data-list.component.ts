
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SpecializationData } from 'app/shared/models/specialization-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SpecializationDataService } from '../shared/specialization-data.service';
import { SpecializationDataEditComponent } from '../specialization-data-edit/specialization-data-edit.component';
import { SpecializationDataNewComponent } from '../specialization-data-new/specialization-data-new.component';
import { SpecializationDataViewComponent } from '../specialization-data-view/specialization-data-view.component';

@Component({
  selector: 'app-specialization-data-list',
  templateUrl: './specialization-data-list.component.html',
  styleUrls: ['./specialization-data-list.component.scss'],
  providers: []
})

export class SpecializationDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;

  
administrationOrRegionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationOrRegion', { static: true }) AdministrationOrRegionSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSpecializationData: SpecializationData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'السنه الماليه', field: 'fiscalYear' }),
	new GridColumnOptions({ headerName: 'الصنف', field: 'product' }),
	new GridColumnOptions({ headerName: 'المخصص', field: 'allocated' }),
	new GridColumnOptions({ headerName: 'ما تم صرفه', field: 'spent' }),
	new GridColumnOptions({ headerName: 'الادارة او المنطقه', field: 'administrationOrRegion' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SpecializationDataViewComponent,
    editDialogClassType: SpecializationDataEditComponent,
    newDialogClassType: SpecializationDataNewComponent,
  });
    constructor(
        injector: Injector,
        public specializationDataService: SpecializationDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSpecializationData = new SpecializationData();

    
	this.administrationOrRegionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة او المنطقه',
	});


    this.searchForm = this.formBuilder.group({
     	fiscalYear : [],
	product : [],
	allocated : [],
	spent : [],
	administrationOrRegion : []
    });

     
  }

  getSpecializationDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SpecializationData[]> => {
    return this.specializationDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.specializationDataService.delete(param.data.id)
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
    this.areasService = new LookupService('areas', this.http);
  }
}

