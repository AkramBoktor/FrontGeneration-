
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubcategoryCode } from 'app/shared/models/subcategory-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubcategoryCodeService } from '../shared/subcategory-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subcategory-code-new',
  templateUrl: './subcategory-code-new.component.html',
  styleUrls: ['./subcategory-code-new.component.scss'],
  providers: [
    ]
})

export class SubcategoryCodeNewComponent extends AppBaseComponent implements OnInit {
  subcategoryCodeForm: FormGroup;
  @Input() selectedSubcategoryCode: SubcategoryCode;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SubcategoryCodeNewComponent>,
    public subcategoryCodeService: SubcategoryCodeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubcategoryCode = new SubcategoryCode();

    

    this.subcategoryCodeForm = this.formBuilder.group({
     
  id : [0],
  subMaterialCode : [this.selectedSubcategoryCode.subMaterialCode, [ Validators.required ]],
  subMaterialName : [this.selectedSubcategoryCode.subMaterialName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.subcategoryCodeService.create(this.subcategoryCodeForm.value)
        .pipe(switchMap(x => {
			return this.subcategoryCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.subcategoryCodeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
