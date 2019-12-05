
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PreviewNotesData } from 'app/shared/models/preview-notes-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PreviewNotesDataService } from '../shared/preview-notes-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-preview-notes-data-edit',
  templateUrl: './preview-notes-data-edit.component.html',
  styleUrls: ['./preview-notes-data-edit.component.scss'],
  providers: []
})

export class PreviewNotesDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPreviewNotesData: PreviewNotesData;
  previewNotesDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private borderCodesService: LookupService;
private insideOutsideSitesService: LookupService;

  
borderCodeSelectOptions: MaterialSelectOptions;
insideOutsideSiteSelectOptions: MaterialSelectOptions;

  
	@ViewChild('borderCode', { static: true }) BorderCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('insideOutsideSite', { static: true }) InsideOutsideSiteSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPreviewNotesDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<PreviewNotesDataEditComponent>,
    public previewNotesDataService: PreviewNotesDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPreviewNotesData = new PreviewNotesData();
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
      
  id : [this.selectedPreviewNotesData.id],
  landID : [this.selectedPreviewNotesData.landID, [ Validators.required ]],
  dimension : [this.selectedPreviewNotesData.dimension, [ Validators.required ]],
  borderCode : [this.selectedPreviewNotesData.borderCode, [ Validators.required ]],
  insideOutsideSite : [this.selectedPreviewNotesData.insideOutsideSite, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.previewNotesDataService.update(this.previewNotesDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.previewNotesDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.previewNotesDataForm.get(name);
  }

  initializeLookupServices() {
    this.borderCodesService = new LookupService('bordercodes	s', this.http);
this.insideOutsideSitesService = new LookupService('insideoutsidesites', this.http);
  }
}
