
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataOfTheLandSeriesInLegalAffairs } from 'app/shared/models/data-of-the-land-series-in-legal-affairs';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataOfTheLandSeriesInLegalAffairsService } from '../shared/data-of-the-land-series-in-legal-affairs.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-of-the-land-series-in-legal-affairs-new',
  templateUrl: './data-of-the-land-series-in-legal-affairs-new.component.html',
  styleUrls: ['./data-of-the-land-series-in-legal-affairs-new.component.scss'],
  providers: [
    ]
})

export class DataOfTheLandSeriesInLegalAffairsNewComponent extends AppBaseComponent implements OnInit {
  dataOfTheLandSeriesInLegalAffairsForm: FormGroup;
  @Input() selectedDataOfTheLandSeriesInLegalAffairs: DataOfTheLandSeriesInLegalAffairs;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataOfTheLandSeriesInLegalAffairsNewComponent>,
    public dataOfTheLandSeriesInLegalAffairsService: DataOfTheLandSeriesInLegalAffairsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfTheLandSeriesInLegalAffairs = new DataOfTheLandSeriesInLegalAffairs();

    

    this.dataOfTheLandSeriesInLegalAffairsForm = this.formBuilder.group({
     
  id : [0],
  landIDLegalAffairs : [this.selectedDataOfTheLandSeriesInLegalAffairs.landIDLegalAffairs, [ Validators.required ]],
  landID : [this.selectedDataOfTheLandSeriesInLegalAffairs.landID, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.dataOfTheLandSeriesInLegalAffairsService.create(this.dataOfTheLandSeriesInLegalAffairsForm.value)
        .pipe(switchMap(x => {
			return this.dataOfTheLandSeriesInLegalAffairsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataOfTheLandSeriesInLegalAffairsForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
