import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchpostService } from '../../services/fetchpost.service';
import { MedicationFormDetails } from '../../model/medication-form-details';
import { MatDialog } from '@angular/material/dialog';
import { EditMedicationComponent } from './modal/edit-medication/edit-medication.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-medication-history',
  templateUrl: './medication-history.component.html',
  styleUrls: ['./medication-history.component.scss'],
})
export class MedicationHistoryComponent implements OnInit {
  user: any;
  isShown: boolean = false;
  formValue!: FormGroup;
  medicationDetails: any;
  currentData: any;
  constructor(
    private router: Router,
    private fetchpostservice: FetchpostService,
    private formbuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.userData;
    this.formValue = this.formbuilder.group({
      currentmedication: [],
      otcmedication: [],
      herbsmineralandvitamin: [],
      socialdrug: [],
      pastprescribedmedication: [],
      drugallergies: [],
      reactionother: [],
      // otcmedication: new FormControl(),
      // herbsmineralandvitamin: new FormControl(),
      // socialdrug: new FormControl(),
      // pastprescribedmedication: new FormControl(),
      // drugallergies: new FormControl(),
      // reactionother: new FormControl(),
    });
    this.getAllMedicationData();
  }
  getAllMedicationData() {
    this.fetchpostservice.getMedicationData().subscribe(
      (res) => {
        console.log(res);
        this.medicationDetails = res;
      },

      (err) => {}
    );
  }
  deleteMedication(m: any) {
    this.fetchpostservice.deleteMedicationData(m.id).subscribe(
      (res) => {
        this.getAllMedicationData();
      },
      (err) => {}
    );
  }

  openDialog(m: any) {
    this.isShown = !this.isShown;
    console.log(m, 'edit data');
    this.currentData = m;

    this.formValue.controls['currentmedication'].setValue(m.currentmedication);
    this.formValue.controls['otcmedication'].setValue(m.otcmedication);
    this.formValue.controls['herbsmineralandvitamin'].setValue(
      m.herbsmineralandvitamin
    );
    this.formValue.controls['socialdrug'].setValue(m.socialdrug);
    this.formValue.controls['drugallergies'].setValue(m.drugallergies);
    this.formValue.controls['reactionother'].setValue(m.reactionother);
    this.formValue.controls['pastprescribedmedication'].setValue(
      m.pastprescribedmedication
    );
    // console.log(m.otcmedication);
  }
  updateMedicationData() {
    // location.reload();
    console.log(this.medicationDetails);
    this.currentData.currentmedication = this.formValue.value.currentmedication;
    this.currentData.otcmedication = this.formValue.value.otcmedication;
    this.currentData.herbsmineralandvitamin =
      this.formValue.value.herbsmineralandvitamin;
    this.currentData.socialdrug = this.formValue.value.socialdrug;
    this.currentData.pastprescribedmedication =
      this.formValue.value.pastprescribedmedication;
    this.currentData.drugallergies = this.formValue.value.drugallergies;
    this.currentData.reactionother = this.formValue.value.reactionother;

    this.fetchpostservice
      .updateMedicationData(this.currentData.id, this.currentData)
      .subscribe(
        (res) => {
          this.isShown = false;
        },
        (err) => {}
      );
  }
}
