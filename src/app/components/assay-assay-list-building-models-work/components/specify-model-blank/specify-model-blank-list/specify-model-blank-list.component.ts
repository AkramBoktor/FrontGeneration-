
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SpecifyModelBlank } from 'app/shared/models/specify-model-blank';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SpecifyModelBlankEditComponent } from '../specify-model-blank-edit/specify-model-blank-edit.component';
import { SpecifyModelBlankNewComponent } from '../specify-model-blank-new/specify-model-blank-new.component';
import { SpecifyModelBlankViewComponent } from '../specify-model-blank-view/specify-model-blank-view.component';
import { SpecifyModelBlankService } from '../shared/specify-model-blank.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-specify-model-blank-list',
  templateUrl: './specify-model-blank-list.component.html',
  styleUrls: ['./specify-model-blank-list.component.scss'],
  providers: []
})

export class SpecifyModelBlankListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private educationalLevelsService: LookupService;

  
educationalStageSelectOptions: MaterialSelectOptions;

  
	@ViewChild('educationalStage', { static: true }) EducationalStageSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSpecifyModelBlank: SpecifyModelBlank;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الدور', field: 'floorNumber' }),
	new GridColumnOptions({ headerName: 'العدد', field: 'count' }),
	new GridColumnOptions({ headerName: 'كود الفراغ', field: 'spaceCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SpecifyModelBlankViewComponent,
    editDialogClassType: SpecifyModelBlankEditComponent,
    newDialogClassType: SpecifyModelBlankNewComponent,
  });
    constructor(
        injector: Injector,
        public specifyModelBlankService: SpecifyModelBlankService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSpecifyModelBlank = new SpecifyModelBlank();

    
	this.educationalStageSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحلة التعليمية',
	});


    this.searchForm = this.formBuilder.group({
     	modelCode : [],
	educationalStage : []
    });

     
  }

  getSpecifyModelBlanksPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SpecifyModelBlank[]> => {
    return this.specifyModelBlankService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.specifyModelBlankService.delete(param.data.id)
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
    this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}

