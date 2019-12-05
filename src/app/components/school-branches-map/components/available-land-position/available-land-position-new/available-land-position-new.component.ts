
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AvailableLandPosition } from 'app/shared/models/available-land-position';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AvailableLandPositionService } from '../shared/available-land-position.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-available-land-position-new',
  templateUrl: './available-land-position-new.component.html',
  styleUrls: ['./available-land-position-new.component.scss'],
  providers: [
    ]
})

export class AvailableLandPositionNewComponent extends AppBaseComponent implements OnInit {
  availableLandPositionForm: FormGroup;
  @Input() selectedAvailableLandPosition: AvailableLandPosition;
  errorMessages: FormControlError[] = [
        
  ];

  private documentCodesService: LookupService;

  
documentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('document', { static: true }) DocumentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AvailableLandPositionNewComponent>,
    public availableLandPositionService: AvailableLandPositionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAvailableLandPosition = new AvailableLandPosition();

    
	this.documentSelectOptions = new MaterialSelectOptions({
	 data: this.documentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المستند',
	});


    this.availableLandPositionForm = this.formBuilder.group({
     
  id : [0],
  projectCode : [this.selectedAvailableLandPosition.projectCode, [ Validators.required ]],
  document : [this.selectedAvailableLandPosition.document, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.availableLandPositionService.create(this.availableLandPositionForm.value)
        .pipe(switchMap(x => {
			return this.availableLandPositionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.availableLandPositionForm.get(name);
    }

  initializeLookupServices() {
    this.documentCodesService = new LookupService('documentcodes', this.http);
  }
 }
