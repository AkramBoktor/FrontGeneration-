
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { MeasurementUnit } from 'app/shared/models/measurement-unit';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MeasurementUnitService } from '../shared/measurement-unit.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-measurement-unit-new',
  templateUrl: './measurement-unit-new.component.html',
  styleUrls: ['./measurement-unit-new.component.scss'],
  providers: [
    ]
})

export class MeasurementUnitNewComponent extends AppBaseComponent implements OnInit {
  measurementUnitForm: FormGroup;
  @Input() selectedMeasurementUnit: MeasurementUnit;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MeasurementUnitNewComponent>,
    public measurementUnitService: MeasurementUnitService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMeasurementUnit = new MeasurementUnit();

    

    this.measurementUnitForm = this.formBuilder.group({
     
  id : [0],
  code : [this.selectedMeasurementUnit.code, [ Validators.required ]],
  name : [this.selectedMeasurementUnit.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.measurementUnitService.create(this.measurementUnitForm.value)
        .pipe(switchMap(x => {
			return this.measurementUnitService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.measurementUnitForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
