
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CommentOnPhotosAndBuildingDrawing } from 'app/shared/models/comment-on-photos-and-building-drawing';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CommentOnPhotosAndBuildingDrawingService } from '../shared/comment-on-photos-and-building-drawing.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-comment-on-photos-and-building-drawing-new',
  templateUrl: './comment-on-photos-and-building-drawing-new.component.html',
  styleUrls: ['./comment-on-photos-and-building-drawing-new.component.scss'],
  providers: [
    ]
})

export class CommentOnPhotosAndBuildingDrawingNewComponent extends AppBaseComponent implements OnInit {
  commentOnPhotosAndBuildingDrawingForm: FormGroup;
  @Input() selectedCommentOnPhotosAndBuildingDrawing: CommentOnPhotosAndBuildingDrawing;
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

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CommentOnPhotosAndBuildingDrawingNewComponent>,
    public commentOnPhotosAndBuildingDrawingService: CommentOnPhotosAndBuildingDrawingService)
    {
    super(injector);
    }
    
  ngOnInit() {
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


    this.commentOnPhotosAndBuildingDrawingForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedCommentOnPhotosAndBuildingDrawing.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedCommentOnPhotosAndBuildingDrawing.schoolAddress, [ ]],
  previewDate : [this.selectedCommentOnPhotosAndBuildingDrawing.previewDate, [ ]],
  startDate : [this.selectedCommentOnPhotosAndBuildingDrawing.startDate, [ ]],
  endDate : [this.selectedCommentOnPhotosAndBuildingDrawing.endDate, [ ]],
  text : [this.selectedCommentOnPhotosAndBuildingDrawing.text, [ Validators.required ]],
  sectionCenter : [this.selectedCommentOnPhotosAndBuildingDrawing.sectionCenter, [ Validators.required ]],
  village : [this.selectedCommentOnPhotosAndBuildingDrawing.village, [ Validators.required ]],
  educationalAdministration : [this.selectedCommentOnPhotosAndBuildingDrawing.educationalAdministration, [ Validators.required ]],
  statementType : [this.selectedCommentOnPhotosAndBuildingDrawing.statementType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.commentOnPhotosAndBuildingDrawingService.create(this.commentOnPhotosAndBuildingDrawingForm.value)
        .pipe(switchMap(x => {
			return this.commentOnPhotosAndBuildingDrawingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.commentOnPhotosAndBuildingDrawingForm.get(name);
    }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
  }
 }
