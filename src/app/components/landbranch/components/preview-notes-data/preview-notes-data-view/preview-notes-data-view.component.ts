
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PreviewNotesData } from 'app/shared/models/preview-notes-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PreviewNotesDataService } from '../shared/preview-notes-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-preview-notes-data-view',
  templateUrl: './preview-notes-data-view.component.html',
  styleUrls: ['./preview-notes-data-view.component.scss'],
  providers: []
})

export class PreviewNotesDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPreviewNotesData: PreviewNotesData;
  previewNotesDataForm: FormGroup;

  private borderCodesService: LookupService;
private insideOutsideSitesService: LookupService;

  
borderCodeSelectOptions: MaterialSelectOptions;
insideOutsideSiteSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPreviewNotesDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<PreviewNotesDataViewComponent>,
    public previewNotesDataService: PreviewNotesDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPreviewNotesData = this.selectedPreviewNotesDataDialog.data || this.selectedPreviewNotesData;

    
	this.borderCodeSelectOptions = new MaterialSelectOptions({
	 data: this.borderCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحدد',
	});

	this.insideOutsideSiteSelectOptions = new MaterialSelectOptions({
	 data: this.insideOutsideSitesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'داخل / خارج الموقع',
	});


    this.previewNotesDataForm = this.formBuilder.group({
      
  landID : [this.selectedPreviewNotesData.landID],
  dimension : [this.selectedPreviewNotesData.dimension],
  borderCode : [this.selectedPreviewNotesData.borderCode],
  insideOutsideSite : [this.selectedPreviewNotesData.insideOutsideSite]
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
    return this.previewNotesDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.previewNotesDataForm.controls)) {
      this.previewNotesDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.borderCodesService = new LookupService('bordercodes	s', this.http);
this.insideOutsideSitesService = new LookupService('insideoutsidesites', this.http);
  }
}

