
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CareerPrograms } from 'app/shared/models/career-programs';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CareerProgramsService } from '../shared/career-programs.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-career-programs-new',
  templateUrl: './career-programs-new.component.html',
  styleUrls: ['./career-programs-new.component.scss'],
  providers: [
    ]
})

export class CareerProgramsNewComponent extends AppBaseComponent implements OnInit {
  careerProgramsForm: FormGroup;
  @Input() selectedCareerPrograms: CareerPrograms;
  errorMessages: FormControlError[] = [
        
  ];

  private areasService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CareerProgramsNewComponent>,
    public careerProgramsService: CareerProgramsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCareerPrograms = new CareerPrograms();

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});


    this.careerProgramsForm = this.formBuilder.group({
     
  id : [0],
  jobCode : [this.selectedCareerPrograms.jobCode, [ ]],
  jobName : [this.selectedCareerPrograms.jobName, [ ]],
  scheduledNumber : [this.selectedCareerPrograms.scheduledNumber, [ ]],
  region : [this.selectedCareerPrograms.region, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.careerProgramsService.create(this.careerProgramsForm.value)
        .pipe(switchMap(x => {
			return this.careerProgramsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.careerProgramsForm.get(name);
    }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
  }
 }
