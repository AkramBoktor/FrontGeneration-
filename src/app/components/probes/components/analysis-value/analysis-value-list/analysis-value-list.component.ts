
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AnalysisValue } from 'app/shared/models/analysis-value';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AnalysisValueEditComponent } from '../analysis-value-edit/analysis-value-edit.component';
import { AnalysisValueNewComponent } from '../analysis-value-new/analysis-value-new.component';
import { AnalysisValueViewComponent } from '../analysis-value-view/analysis-value-view.component';
import { AnalysisValueService } from '../shared/analysis-value.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-analysis-value-list',
  templateUrl: './analysis-value-list.component.html',
  styleUrls: ['./analysis-value-list.component.scss'],
  providers: []
})

export class AnalysisValueListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private firstLevelCodesService: LookupService;

  
firstLevelCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('firstLevelCode', { static: true }) FirstLevelCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAnalysisValue: AnalysisValue;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم المدرسه', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'رقم الجسه', field: 'sensorsNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الجسه', field: 'sensorsDate' }),
	new GridColumnOptions({ headerName: 'منسوب المياه الجوفيه الابتدائي', field: 'primaryGroundwaterLevel' }),
	new GridColumnOptions({ headerName: 'منسوب المياه الجوفيه النهائيه', field: 'finalGroundwaterLevel' }),
	new GridColumnOptions({ headerName: 'رقم الطبقه', field: 'layerNumber' }),
	new GridColumnOptions({ headerName: 'نهايه عمق الطبقه', field: 'endOfLayerDepth' }),
	new GridColumnOptions({ headerName: 'منسوب الاختيار', field: 'selectionLevel' }),
	new GridColumnOptions({ headerName: 'كود المستوى الثانى', field: 'secondLevelCode' }),
	new GridColumnOptions({ headerName: 'كود المستوى الثالث', field: 'thirdLevelCode' }),
	new GridColumnOptions({ headerName: 'كود المستوى الاول', field: 'firstLevelCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AnalysisValueViewComponent,
    editDialogClassType: AnalysisValueEditComponent,
    newDialogClassType: AnalysisValueNewComponent,
  });
    constructor(
        injector: Injector,
        public analysisValueService: AnalysisValueService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAnalysisValue = new AnalysisValue();

    
	this.firstLevelCodeSelectOptions = new MaterialSelectOptions({
	 data: this.firstLevelCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستوى الاول',
	});


    this.searchForm = this.formBuilder.group({
     	schoolName : [],
	sensorsNumber : [],
	sensorsDate : [],
	primaryGroundwaterLevel : [],
	finalGroundwaterLevel : [],
	layerNumber : [],
	endOfLayerDepth : [],
	selectionLevel : [],
	secondLevelCode : [],
	thirdLevelCode : [],
	firstLevelCode : []
    });

     
  }

  getAnalysisValuesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AnalysisValue[]> => {
    return this.analysisValueService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.analysisValueService.delete(param.data.id)
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
    this.firstLevelCodesService = new LookupService('firstlevelcodes', this.http);
  }
}

