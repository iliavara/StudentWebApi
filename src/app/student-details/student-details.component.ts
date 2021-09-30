import { Component, OnInit } from '@angular/core';
import { StudentDetailService } from '../shared/student-detail.service';
import { StudentDetail } from '../shared/student-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styles: [
  ]
})
export class StudentDetailsComponent implements OnInit {

  constructor(public service: StudentDetailService,
    private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.service.refreshList()
  }

  populateForm(selectedRecord: StudentDetail){
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number){
    if(confirm('Are you sure you want to delete?')){
    this.service.deleteStudentDetail(id)
    .subscribe(
      res=>{
        this.service.refreshList();
        this.toastr.error("Deleted Successfully", "Student Detail Register");
        
      }, 
      err => {console.log(err)}
      )
    }
  }
}
