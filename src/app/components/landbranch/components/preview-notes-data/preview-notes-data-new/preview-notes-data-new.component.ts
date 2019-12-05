
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PreviewNotesData } from 'app/shared/models/preview-notes-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PreviewNotesDataService } from '../shared/preview-notes-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-preview-notes-data-new',
  templateUrl: './preview-notes-data-new.component.html',
  styleUrls: ['./preview-notes-data-new.component.scss'],
  providers: [
    ]
})

export class PreviewNotesDataNewComponent extends AppBaseComponent implements OnInit {
  previewNotesDataForm: FormGroup;
  @Input() selectedPreviewNotesData: PreviewNotesData;
  errorMessages: FormControlError[] = [
        
  ];

  private borderCodesService: LookupService;
private insideOutsideSitesService: LookupService;

  
borderCodeSelectOptions: MaterialSelectOptions;
insideOutsideSiteSelectOptions: MaterialSelectOptions;

  
	@ViewChild('borderCode', { static: true }) BorderCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('insideOutsideSite', { static: true }) InsideOutsideSiteSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PreviewNotesDataNewComponent>,
    public previewNotesDataService: PreviewNotesDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPreviewNotesData = new PreviewNotesData();

    
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
     
  id : [0],
  landID : [this.selectedPreviewNotesData.landID, [ Validators.required ]],
  dimension : [this.selectedPreviewNotesData.dimension, [ Validators.required ]],
  borderCode : [this.selectedPreviewNotesData.borderCode, [ Validators.required ]],
  insideOutsideSite : [this.selectedPreviewNotesData.insideOutsideSite, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.previewNotesDataService.create(this.previewNotesDataForm.value)
        .pipe(switchMap(x => {
			return this.previewNotesDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.previewNotesDataForm.get(name);
    }

  initializeLookupServices() {
    this.borderCodesService = new LookupService('bordercodes	s', this.http);
this.insideOutsideSitesService = new LookupService('insideoutsidesites', this.http);
  }
 }
