
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataOfTheLandSeriesInLegalAffairs } from 'app/shared/models/data-of-the-land-series-in-legal-affairs';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataOfTheLandSeriesInLegalAffairsEditComponent } from '../data-of-the-land-series-in-legal-affairs-edit/data-of-the-land-series-in-legal-affairs-edit.component';
import { DataOfTheLandSeriesInLegalAffairsNewComponent } from '../data-of-the-land-series-in-legal-affairs-new/data-of-the-land-series-in-legal-affairs-new.component';
import { DataOfTheLandSeriesInLegalAffairsViewComponent } from '../data-of-the-land-series-in-legal-affairs-view/data-of-the-land-series-in-legal-affairs-view.component';
import { DataOfTheLandSeriesInLegalAffairsService } from '../shared/data-of-the-land-series-in-legal-affairs.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-of-the-land-series-in-legal-affairs-list',
  templateUrl: './data-of-the-land-series-in-legal-affairs-list.component.html',
  styleUrls: ['./data-of-the-land-series-in-legal-affairs-list.component.scss'],
  providers: []
})

export class DataOfTheLandSeriesInLegalAffairsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDataOfTheLandSeriesInLegalAffairs: DataOfTheLandSeriesInLegalAffairs;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'مسلسل الارض بالشئون القانونية', field: 'landIDLegalAffairs' }),
	new GridColumnOptions({ headerName: 'كود الارض', field: 'landID' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataOfTheLandSeriesInLegalAffairsViewComponent,
    editDialogClassType: DataOfTheLandSeriesInLegalAffairsEditComponent,
    newDialogClassType: DataOfTheLandSeriesInLegalAffairsNewComponent,
  });
    constructor(
        injector: Injector,
        public dataOfTheLandSeriesInLegalAffairsService: DataOfTheLandSeriesInLegalAffairsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataOfTheLandSeriesInLegalAffairs = new DataOfTheLandSeriesInLegalAffairs();

    

    this.searchForm = this.formBuilder.group({
     	landIDLegalAffairs : [],
	landID : []
    });

     
  }

  getDataOfTheLandSeriesInLegalAffairsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataOfTheLandSeriesInLegalAffairs[]> => {
    return this.dataOfTheLandSeriesInLegalAffairsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataOfTheLandSeriesInLegalAffairsService.delete(param.data.id)
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

