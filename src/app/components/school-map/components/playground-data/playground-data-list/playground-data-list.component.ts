
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PlaygroundData } from 'app/shared/models/playground-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PlaygroundDataEditComponent } from '../playground-data-edit/playground-data-edit.component';
import { PlaygroundDataNewComponent } from '../playground-data-new/playground-data-new.component';
import { PlaygroundDataViewComponent } from '../playground-data-view/playground-data-view.component';
import { PlaygroundDataService } from '../shared/playground-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-playground-data-list',
  templateUrl: './playground-data-list.component.html',
  styleUrls: ['./playground-data-list.component.scss'],
  providers: []
})

export class PlaygroundDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private playgroundTypesService: LookupService;
private landTypesService: LookupService;
private statusCodesService: LookupService;

  
playgroundTypeSelectOptions: MaterialSelectOptions;
landTypeSelectOptions: MaterialSelectOptions;
statusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('playgroundType', { static: true }) PlaygroundTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('landType', { static: true }) LandTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('status', { static: true }) StatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedPlaygroundData: PlaygroundData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم الملعب', field: 'playgroundNumber' }),
	new GridColumnOptions({ headerName: 'طول الملعب', field: 'playgroundLength' }),
	new GridColumnOptions({ headerName: 'عرض الملعب', field: 'playgroundWidth' }),
	new GridColumnOptions({ headerName: 'نوع الملعب', field: 'playgroundType' }),
	new GridColumnOptions({ headerName: 'نوع الارض', field: 'landType' }),
	new GridColumnOptions({ headerName: 'الحالة', field: 'status' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PlaygroundDataViewComponent,
    editDialogClassType: PlaygroundDataEditComponent,
    newDialogClassType: PlaygroundDataNewComponent,
  });
    constructor(
        injector: Injector,
        public playgroundDataService: PlaygroundDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPlaygroundData = new PlaygroundData();

    
	this.playgroundTypeSelectOptions = new MaterialSelectOptions({
	 data: this.playgroundTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الملعب',
	});

	this.landTypeSelectOptions = new MaterialSelectOptions({
	 data: this.landTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الارض',
	});

	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحالة',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	playgroundNumber : [],
	playgroundType : [],
	landType : [],
	status : []
    });

     
  }

  getPlaygroundsDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PlaygroundData[]> => {
    return this.playgroundDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.playgroundDataService.delete(param.data.id)
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
    this.playgroundTypesService = new LookupService('playgroundtypes', this.http);
this.landTypesService = new LookupService('landtypes', this.http);
this.statusCodesService = new LookupService('statuscodes', this.http);
  }
}

