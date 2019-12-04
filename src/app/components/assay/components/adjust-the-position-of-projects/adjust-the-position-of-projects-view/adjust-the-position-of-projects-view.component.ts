
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AdjustThePositionOfProjects } from 'app/shared/models/adjust-the-position-of-projects';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AdjustThePositionOfProjectsService } from '../shared/adjust-the-position-of-projects.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-adjust-the-position-of-projects-view',
  templateUrl: './adjust-the-position-of-projects-view.component.html',
  styleUrls: ['./adjust-the-position-of-projects-view.component.scss'],
  providers: []
})

export class AdjustThePositionOfProjectsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAdjustThePositionOfProjects: AdjustThePositionOfProjects;
  adjustThePositionOfProjectsForm: FormGroup;

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;

  
branchSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAdjustThePositionOfProjectsDialog: any,
    @Optional() public dialogRef: MatDialogRef<AdjustThePositionOfProjectsViewComponent>,
    public adjustThePositionOfProjectsService: AdjustThePositionOfProjectsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAdjustThePositionOfProjects = this.selectedAdjustThePositionOfProjectsDialog.data || this.selectedAdjustThePositionOfProjects;

    
	this.branchSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفروع ',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.adjustThePositionOfProjectsForm = this.formBuilder.group({
      
  buildingNumber : [this.selectedAdjustThePositionOfProjects.buildingNumber],
  entryDate : [this.selectedAdjustThePositionOfProjects.entryDate],
  extensionCode : [this.selectedAdjustThePositionOfProjects.extensionCode],
  pLanYear : [this.selectedAdjustThePositionOfProjects.pLanYear],
  positionCode : [this.selectedAdjustThePositionOfProjects.positionCode],
  branch : [this.selectedAdjustThePositionOfProjects.branch],
  constructionType : [this.selectedAdjustThePositionOfProjects.constructionType]
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
    return this.adjustThePositionOfProjectsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.adjustThePositionOfProjectsForm.controls)) {
      this.adjustThePositionOfProjectsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

