
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CommentOnPhotosAndBuildingDrawing } from 'app/shared/models/comment-on-photos-and-building-drawing';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CommentOnPhotosAndBuildingDrawingService } from '../shared/comment-on-photos-and-building-drawing.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-comment-on-photos-and-building-drawing-view',
  templateUrl: './comment-on-photos-and-building-drawing-view.component.html',
  styleUrls: ['./comment-on-photos-and-building-drawing-view.component.scss'],
  providers: []
})

export class CommentOnPhotosAndBuildingDrawingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCommentOnPhotosAndBuildingDrawing: CommentOnPhotosAndBuildingDrawing;
  commentOnPhotosAndBuildingDrawingForm: FormGroup;

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;
private statementTypesService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
statementTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCommentOnPhotosAndBuildingDrawingDialog: any,
    @Optional() public dialogRef: MatDialogRef<CommentOnPhotosAndBuildingDrawingViewComponent>,
    public commentOnPhotosAndBuildingDrawingService: CommentOnPhotosAndBuildingDrawingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCommentOnPhotosAndBuildingDrawing = this.selectedCommentOnPhotosAndBuildingDrawingDialog.data || this.selectedCommentOnPhotosAndBuildingDrawing;

    
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
      
  buildingCode : [this.selectedCommentOnPhotosAndBuildingDrawing.buildingCode],
  schoolAddress : [this.selectedCommentOnPhotosAndBuildingDrawing.schoolAddress],
  previewDate : [this.selectedCommentOnPhotosAndBuildingDrawing.previewDate],
  startDate : [this.selectedCommentOnPhotosAndBuildingDrawing.startDate],
  endDate : [this.selectedCommentOnPhotosAndBuildingDrawing.endDate],
  text : [this.selectedCommentOnPhotosAndBuildingDrawing.text],
  sectionCenter : [this.selectedCommentOnPhotosAndBuildingDrawing.sectionCenter],
  village : [this.selectedCommentOnPhotosAndBuildingDrawing.village],
  educationalAdministration : [this.selectedCommentOnPhotosAndBuildingDrawing.educationalAdministration],
  statementType : [this.selectedCommentOnPhotosAndBuildingDrawing.statementType]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.commentOnPhotosAndBuildingDrawingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.commentOnPhotosAndBuildingDrawingForm.controls)) {
      this.commentOnPhotosAndBuildingDrawingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
  }
}

