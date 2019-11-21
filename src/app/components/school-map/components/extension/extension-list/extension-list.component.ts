
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Extension } from 'app/shared/models/extension';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExtensionEditComponent } from '../extension-edit/extension-edit.component';
import { ExtensionNewComponent } from '../extension-new/extension-new.component';
import { ExtensionViewComponent } from '../extension-view/extension-view.component';
import { ExtensionService } from '../shared/extension.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-extension-list',
  templateUrl: './extension-list.component.html',
  styleUrls: ['./extension-list.component.scss'],
  providers: []
})

export class ExtensionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedExtension: Extension;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'مسلسل الملحق', field: 'extensionSerial' }),
	new GridColumnOptions({ headerName: 'اجمالي عدد الأدوار', field: 'totalNumberOfFloors' }),
	new GridColumnOptions({ headerName: 'اجمالي مساحة الملحق', field: 'totalExtensionArea' }),
	new GridColumnOptions({ headerName: 'تاريخ انشاء الملحق', field: 'extensionConstructionDate' }),
	new GridColumnOptions({ headerName: 'كود المركز الإقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود حالة هيكل الملحق', field: 'extensionStructureStatusCode' }),
	new GridColumnOptions({ headerName: 'كود حالة التشطيبات الداخلية', field: 'interiorFinishesStatusCode' }),
	new GridColumnOptions({ headerName: 'كود حالة الاعمال الصحية', field: 'sanitationStatusCode' }),
	new GridColumnOptions({ headerName: 'كود حالة الاعمال الكهربائية', field: 'electricalWorksStatusCode' }),
	new GridColumnOptions({ headerName: 'كود قابلة الملحق للتعلية', field: 'extensionAbilityForRampingCode' }),
	new GridColumnOptions({ headerName: 'كود نظام انشاء الملحق', field: 'extensionConstructionSystemCode' }),
	new GridColumnOptions({ headerName: 'كود طريقة انشاء الملحق ', field: 'extensionConstructionWayCode' }),
	new GridColumnOptions({ headerName: 'كود مواد بناء حوائط الملحق', field: 'extensionWallConstructionMaterialsCode' }),
	new GridColumnOptions({ headerName: 'كود مواد بناء الاسقف', field: 'roofingMaterialsCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات ارضيات الفصول', field: 'classFloorsFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات ارضيات الطرقات', field: 'corridorsFloorFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات ارضيات دورات مياة', field: 'bathroomsFloorFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات ارضيات معامل', field: 'labsFloorFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات ارضيات اخري', field: 'otherFloorFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات حوائط الفصول', field: 'classWallsFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات حوائط الطرقات', field: 'corridorsWallsFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات حوائط دورات', field: 'bathroomsWallsFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات حوائط معامل', field: 'labsWallsFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات حوائط اخري', field: 'otherWallsFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات اسقف الفصول', field: 'classCeilingsFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات اسقف الطرقات', field: 'corridorsCeilingsFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات اسقف مياه', field: 'bathroomsCeilingsFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات اسقف معامل', field: 'labsCeilingsFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيبات اسقف اخرى', field: 'otherCeilingsFinishingCode' }),
	new GridColumnOptions({ headerName: 'كود تشطيب الواجاهات الخارجية', field: 'exteriorFinishingCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExtensionViewComponent,
    editDialogClassType: ExtensionEditComponent,
    newDialogClassType: ExtensionNewComponent,
  });
    constructor(
        injector: Injector,
        public extensionService: ExtensionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExtension = new Extension();

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الإقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	extensionSerial : [],
	totalNumberOfFloors : [],
	regionalCenterCode : [],
	branchCode : []
    });

     
  }

  getExtensionsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Extension[]> => {
    return this.extensionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.extensionService.delete(param.data.id)
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
  }
}

