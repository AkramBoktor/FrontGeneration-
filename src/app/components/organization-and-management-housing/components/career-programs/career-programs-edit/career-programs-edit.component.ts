
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CareerPrograms } from 'app/shared/models/career-programs';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CareerProgramsService } from '../shared/career-programs.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-career-programs-edit',
  templateUrl: './career-programs-edit.component.html',
  styleUrls: ['./career-programs-edit.component.scss'],
  providers: []
})

export class CareerProgramsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCareerPrograms: CareerPrograms;
  careerProgramsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private areasService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCareerProgramsDialog: any,
    @Optional() public dialogRef: MatDialogRef<CareerProgramsEditComponent>,
    public careerProgramsService: CareerProgramsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCareerPrograms = new CareerPrograms();
    this.selectedCareerPrograms = this.selectedCareerProgramsDialog.data || this.selectedCareerPrograms;

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});


    this.careerProgramsForm = this.formBuilder.group({
      
  id : [this.selectedCareerPrograms.id],
  jobCode : [this.selectedCareerPrograms.jobCode, [ Validators.required ]],
  jobName : [this.selectedCareerPrograms.jobName, [ Validators.required ]],
  scheduledNumber : [this.selectedCareerPrograms.scheduledNumber, [ Validators.required ]],
  region : [this.selectedCareerPrograms.region, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.careerProgramsService.update(this.careerProgramsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.careerProgramsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.careerProgramsForm.get(name);
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
  }
}
