
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataOfTheLandSeriesInLegalAffairs } from 'app/shared/models/data-of-the-land-series-in-legal-affairs';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataOfTheLandSeriesInLegalAffairsService } from '../shared/data-of-the-land-series-in-legal-affairs.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-of-the-land-series-in-legal-affairs-edit',
  templateUrl: './data-of-the-land-series-in-legal-affairs-edit.component.html',
  styleUrls: ['./data-of-the-land-series-in-legal-affairs-edit.component.scss'],
  providers: []
})

export class DataOfTheLandSeriesInLegalAffairsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataOfTheLandSeriesInLegalAffairs: DataOfTheLandSeriesInLegalAffairs;
  dataOfTheLandSeriesInLegalAffairsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataOfTheLandSeriesInLegalAffairsDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataOfTheLandSeriesInLegalAffairsEditComponent>,
    public dataOfTheLandSeriesInLegalAffairsService: DataOfTheLandSeriesInLegalAffairsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfTheLandSeriesInLegalAffairs = new DataOfTheLandSeriesInLegalAffairs();
    this.selectedDataOfTheLandSeriesInLegalAffairs = this.selectedDataOfTheLandSeriesInLegalAffairsDialog.data || this.selectedDataOfTheLandSeriesInLegalAffairs;

    

    this.dataOfTheLandSeriesInLegalAffairsForm = this.formBuilder.group({
      
  id : [this.selectedDataOfTheLandSeriesInLegalAffairs.id],
  landIDLegalAffairs : [this.selectedDataOfTheLandSeriesInLegalAffairs.landIDLegalAffairs, [ Validators.required ]],
  landID : [this.selectedDataOfTheLandSeriesInLegalAffairs.landID, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataOfTheLandSeriesInLegalAffairsService.update(this.dataOfTheLandSeriesInLegalAffairsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataOfTheLandSeriesInLegalAffairsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataOfTheLandSeriesInLegalAffairsForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
