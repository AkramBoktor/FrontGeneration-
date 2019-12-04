
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CommentOnPhotosAndBuildingDrawing } from 'app/shared/models/comment-on-photos-and-building-drawing';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CommentOnPhotosAndBuildingDrawingEditComponent } from '../comment-on-photos-and-building-drawing-edit/comment-on-photos-and-building-drawing-edit.component';
import { CommentOnPhotosAndBuildingDrawingNewComponent } from '../comment-on-photos-and-building-drawing-new/comment-on-photos-and-building-drawing-new.component';
import { CommentOnPhotosAndBuildingDrawingViewComponent } from '../comment-on-photos-and-building-drawing-view/comment-on-photos-and-building-drawing-view.component';
import { CommentOnPhotosAndBuildingDrawingService } from '../shared/comment-on-photos-and-building-drawing.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-comment-on-photos-and-building-drawing-list',
  templateUrl: './comment-on-photos-and-building-drawing-list.component.html',
  styleUrls: ['./comment-on-photos-and-building-drawing-list.component.scss'],
  providers: []
})

export class CommentOnPhotosAndBuildingDrawingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;
private statementTypesService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
statementTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('statementType', { static: true }) StatementTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedCommentOnPhotosAndBuildingDrawing: CommentOnPhotosAndBuildingDrawing;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'عنوان المدرسة', field: 'schoolAddress' }),
	new GridColumnOptions({ headerName: 'تاريخ المعاينة', field: 'previewDate' }),
	new GridColumnOptions({ headerName: 'ت. بداية', field: 'startDate' }),
	new GridColumnOptions({ headerName: 'ت.النهاية', field: 'endDate' }),
	new GridColumnOptions({ headerName: 'النص', field: 'text' }),
	new GridColumnOptions({ headerName: 'القسم/المركز', field: 'sectionCenter' }),
	new GridColumnOptions({ headerName: 'القرية/الشياخة', field: 'village' }),
	new GridColumnOptions({ headerName: 'الادارة التعليمية', field: 'educationalAdministration' }),
	new GridColumnOptions({ headerName: 'نوع المعاينة', field: 'statementType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CommentOnPhotosAndBuildingDrawingViewComponent,
    editDialogClassType: CommentOnPhotosAndBuildingDrawingEditComponent,
    newDialogClassType: CommentOnPhotosAndBuildingDrawingNewComponent,
  });
    constructor(
        injector: Injector,
        public commentOnPhotosAndBuildingDrawingService: CommentOnPhotosAndBuildingDrawingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCommentOnPhotosAndBuildingDrawing = new CommentOnPhotosAndBuildingDrawing();

    
	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم/المركز',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القرية/الشياخة',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});

	this.statementTypeSelectOptions = new MaterialSelectOptions({
	 data: this.statementTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعاينة',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	schoolAddress : [],
	previewDate : [],
	startDate : [],
	endDate : [],
	text : [],
	sectionCenter : [],
	village : [],
	educationalAdministration : [],
	statementType : []
    });

     
  }

  getCommentOnPhotosAndBuildingDrawingsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CommentOnPhotosAndBuildingDrawing[]> => {
    return this.commentOnPhotosAndBuildingDrawingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.commentOnPhotosAndBuildingDrawingService.delete(param.data.id)
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
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
  }
}

