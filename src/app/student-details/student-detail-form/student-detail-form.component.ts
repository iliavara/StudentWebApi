import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentDetail } from 'src/app/shared/student-detail.model';
import { StudentDetailService } from 'src/app/shared/student-detail.service';

@Component({
  selector: 'app-student-detail-form',
  templateUrl: './student-detail-form.component.html',
  styles: [
  ]
})
export class StudentDetailFormComponent implements OnInit {

  constructor(public service:StudentDetailService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(this.service.formData.Id == 0){
    this.insertRecord(form);}
    else
    this.updateRecord(form);
  }

  insertRecord(form: NgForm){
    this.service.postStudentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted Successfully','Student Detail Register')
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm){
    this.service.putStudentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated Successfully','Student Detail Register')
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new StudentDetail();
  }


}
