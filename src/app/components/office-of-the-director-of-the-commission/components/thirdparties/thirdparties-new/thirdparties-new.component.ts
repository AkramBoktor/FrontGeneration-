
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { Thirdparties } from 'app/shared/models/thirdparties';
import { switchMap } from 'rxjs/operators';
import { ThirdpartiesService } from '../shared/thirdparties.service';


@Component({
  selector: 'app-thirdparties-new',
  templateUrl: './thirdparties-new.component.html',
  styleUrls: ['./thirdparties-new.component.scss'],
  providers: [
    ]
})

export class ThirdpartiesNewComponent extends AppBaseComponent implements OnInit {
  thirdpartiesForm: FormGroup;
  @Input() selectedThirdparties: Thirdparties;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ThirdpartiesNewComponent>,
    public thirdpartiesService: ThirdpartiesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThirdparties = new Thirdparties();

    

    this.thirdpartiesForm = this.formBuilder.group({
     
  id : [0],
  thirdparty : [this.selectedThirdparties.thirdparty, [ Validators.required ]],
  thirdpartycode : [this.selectedThirdparties.thirdpartycode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.thirdpartiesService.create(this.thirdpartiesForm.value)
        .pipe(switchMap(x => {
			return this.thirdpartiesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.thirdpartiesForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
