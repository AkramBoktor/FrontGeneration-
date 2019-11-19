
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { Thirdparties } from 'app/shared/models/thirdparties';
import { switchMap } from 'rxjs/operators';
import { ThirdpartiesService } from '../shared/thirdparties.service';




@Component({
  selector: 'app-thirdparties-edit',
  templateUrl: './thirdparties-edit.component.html',
  styleUrls: ['./thirdparties-edit.component.scss'],
  providers: []
})

export class ThirdpartiesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedThirdparties: Thirdparties;
  thirdpartiesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedThirdpartiesDialog: any,
    @Optional() public dialogRef: MatDialogRef<ThirdpartiesEditComponent>,
    public thirdpartiesService: ThirdpartiesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThirdparties = new Thirdparties();
    this.selectedThirdparties = this.selectedThirdpartiesDialog.data || this.selectedThirdparties;

    

    this.thirdpartiesForm = this.formBuilder.group({
      
  id : [this.selectedThirdparties.id],
  thirdparty : [this.selectedThirdparties.thirdparty, [ Validators.required ]],
  thirdpartycode : [this.selectedThirdparties.thirdpartycode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.thirdpartiesService.update(this.thirdpartiesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.thirdpartiesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.thirdpartiesForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
