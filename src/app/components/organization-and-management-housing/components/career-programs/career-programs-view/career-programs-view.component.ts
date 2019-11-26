
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CareerPrograms } from 'app/shared/models/career-programs';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CareerProgramsService } from '../shared/career-programs.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-career-programs-view',
  templateUrl: './career-programs-view.component.html',
  styleUrls: ['./career-programs-view.component.scss'],
  providers: []
})

export class CareerProgramsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCareerPrograms: CareerPrograms;
  careerProgramsForm: FormGroup;

  private areasService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCareerProgramsDialog: any,
    @Optional() public dialogRef: MatDialogRef<CareerProgramsViewComponent>,
    public careerProgramsService: CareerProgramsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCareerPrograms = this.selectedCareerProgramsDialog.data || this.selectedCareerPrograms;

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});


    this.careerProgramsForm = this.formBuilder.group({
      
  jobCode : [this.selectedCareerPrograms.jobCode],
  jobName : [this.selectedCareerPrograms.jobName],
  scheduledNumber : [this.selectedCareerPrograms.scheduledNumber],
  region : [this.selectedCareerPrograms.region]
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
    return this.careerProgramsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.careerProgramsForm.controls)) {
      this.careerProgramsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
  }
}

