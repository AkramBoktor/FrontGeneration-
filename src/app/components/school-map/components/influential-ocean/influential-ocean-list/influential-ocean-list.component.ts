
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { InfluentialOcean } from 'app/shared/models/influential-ocean';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InfluentialOceanEditComponent } from '../influential-ocean-edit/influential-ocean-edit.component';
import { InfluentialOceanNewComponent } from '../influential-ocean-new/influential-ocean-new.component';
import { InfluentialOceanViewComponent } from '../influential-ocean-view/influential-ocean-view.component';
import { InfluentialOceanService } from '../shared/influential-ocean.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-influential-ocean-list',
  templateUrl: './influential-ocean-list.component.html',
  styleUrls: ['./influential-ocean-list.component.scss'],
  providers: []
})

export class InfluentialOceanListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private effectTypeCodesService: LookupService;
private effectCodesService: LookupService;

  
effectTypeCodeSelectOptions: MaterialSelectOptions;
effectCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('effectTypeCode', { static: true }) EffectTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('effectCode', { static: true }) EffectCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedInfluentialOcean: InfluentialOcean;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود نوع المؤثر', field: 'effectTypeCode' }),
	new GridColumnOptions({ headerName: 'كود المؤثر', field: 'effectCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: InfluentialOceanViewComponent,
    editDialogClassType: InfluentialOceanEditComponent,
    newDialogClassType: InfluentialOceanNewComponent,
  });
    constructor(
        injector: Injector,
        public influentialOceanService: InfluentialOceanService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedInfluentialOcean = new InfluentialOcean();

    
	this.effectTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.effectTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع المؤثر',
	});

	this.effectCodeSelectOptions = new MaterialSelectOptions({
	 data: this.effectCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المؤثر',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	effectTypeCode : [],
	effectCode : []
    });

     
  }

  getInfluentialOceansPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<InfluentialOcean[]> => {
    return this.influentialOceanService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.influentialOceanService.delete(param.data.id)
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
    this.effectTypeCodesService = new LookupService('effecttypecodes', this.http);
this.effectCodesService = new LookupService('effectcodes', this.http);
  }
}

