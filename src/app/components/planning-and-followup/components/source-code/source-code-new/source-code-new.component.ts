
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SourceCode } from 'app/shared/models/source-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SourceCodeService } from '../shared/source-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-source-code-new',
  templateUrl: './source-code-new.component.html',
  styleUrls: ['./source-code-new.component.scss'],
  providers: [
    ]
})

export class SourceCodeNewComponent extends AppBaseComponent implements OnInit {
  sourceCodeForm: FormGroup;
  @Input() selectedSourceCode: SourceCode;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SourceCodeNewComponent>,
    public sourceCodeService: SourceCodeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSourceCode = new SourceCode();

    

    this.sourceCodeForm = this.formBuilder.group({
     
  id : [0],
  code : [this.selectedSourceCode.code, [ Validators.required ]],
  name : [this.selectedSourceCode.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.sourceCodeService.create(this.sourceCodeForm.value)
        .pipe(switchMap(x => {
			return this.sourceCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.sourceCodeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
