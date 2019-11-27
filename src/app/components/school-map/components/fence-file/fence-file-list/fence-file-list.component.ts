
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { FenceFile } from 'app/shared/models/fence-file';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FenceFileEditComponent } from '../fence-file-edit/fence-file-edit.component';
import { FenceFileNewComponent } from '../fence-file-new/fence-file-new.component';
import { FenceFileViewComponent } from '../fence-file-view/fence-file-view.component';
import { FenceFileService } from '../shared/fence-file.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-fence-file-list',
  templateUrl: './fence-file-list.component.html',
  styleUrls: ['./fence-file-list.component.scss'],
  providers: []
})

export class FenceFileListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private fenceStatusCodesService: LookupService;
private constructionMaterialsService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
fenceStatusCodeSelectOptions: MaterialSelectOptions;
constructionMaterialSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('fenceStatusCode', { static: true }) FenceStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionMaterial', { static: true }) ConstructionMaterialSelectComponent: MaterialSelectComponent;

  
  @Input() selectedFenceFile: FenceFile;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود السور', field: 'fenceCode' }),
	new GridColumnOptions({ headerName: 'ارتفاع  السور', field: 'fenceHight' }),
	new GridColumnOptions({ headerName: 'طول الضلع الشمالي', field: 'northSideLength' }),
	new GridColumnOptions({ headerName: 'طول الضلع الحنوبي', field: 'southSideLength' }),
	new GridColumnOptions({ headerName: 'طول الضلع الشرق', field: 'eastSideLength' }),
	new GridColumnOptions({ headerName: 'طول الضلع الغرب', field: 'westSideLength' }),
	new GridColumnOptions({ headerName: 'طول الضلع شمال الشرق', field: 'northEastSideLength' }),
	new GridColumnOptions({ headerName: 'طول الضلع  جنوب الشرق', field: 'southEastSidelength' }),
	new GridColumnOptions({ headerName: 'طول الضلع شمال غرب', field: 'northWestLength' }),
	new GridColumnOptions({ headerName: 'طول الضلع جنوب غرب', field: 'southWestLength' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود حالة السور', field: 'fenceStatusCode' }),
	new GridColumnOptions({ headerName: 'مادة البناء', field: 'constructionMaterial' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FenceFileViewComponent,
    editDialogClassType: FenceFileEditComponent,
    newDialogClassType: FenceFileNewComponent,
  });
    constructor(
        injector: Injector,
        public fenceFileService: FenceFileService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFenceFile = new FenceFile();

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.fenceStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.fenceStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة السور',
	});

	this.constructionMaterialSelectOptions = new MaterialSelectOptions({
	 data: this.constructionMaterialsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مادة البناء',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	fenceCode : [],
	fenceHight : [],
	regionalCenterCode : [],
	branchCode : [],
	fenceStatusCode : [],
	constructionMaterial : []
    });

     
  }

  getFenceFilesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FenceFile[]> => {
    return this.fenceFileService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.fenceFileService.delete(param.data.id)
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
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.fenceStatusCodesService = new LookupService('fencestatuscodes', this.http);
this.constructionMaterialsService = new LookupService('constructionmaterials', this.http);
  }
}

