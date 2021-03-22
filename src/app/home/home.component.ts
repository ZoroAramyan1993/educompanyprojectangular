import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from '../service/Home.service';
import {Location} from '@angular/common';
import {AuthService} from '../authentication/AuthService';
import {ApplicantService} from '../service/Applicant.service';
import {Course} from '../model/Course';
import {Applicant} from '../model/Appicant';
import {Role} from '../model/Role';
import {ApplicantRegForm} from '../model/ApplicantRegForm';
import {PdfService} from "../service/Pdf.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId: string;
  userEmail: string;
  userName: string;
  applicant: Applicant;
  courses: Course[];
  applicants: Applicant[];
  courseExist = false;
  admin = false;
  userRole: string;
  @Input() applicantCourse;
  constructor(private route: ActivatedRoute,private pdfGenerateservice: PdfService, private router: Router, private location: Location, private applicantService: ApplicantService, private homeService: HomeService, private authService: AuthService) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get('id');
    this.userName = this.route.snapshot.queryParamMap.get('name');
    this.userEmail = this.route.snapshot.queryParamMap.get('email');
    this.userRole = this.route.snapshot.queryParamMap.get('role');

    console.log(this.userRole);
    if (this.userRole === 'ROLE_ADMIN') {
      this.admin = true;
    }
    if (this.userId == null) {
      this.location.replaceState('/');
      this.router.navigate(['/board']);
    }
    this.showCourses();
    this.showApplicants();
  }

  showApplicants() {
    this.homeService.getAllApplicants().subscribe(data => this.applicants = data);
  }

  showCourses() {
    this.homeService.getCourses().subscribe(data => this.courses = data);
  }

  addCourse(courseForm: Course) {
    this.homeService.saveCourse(courseForm).subscribe(data => this.showCourses());
  }
  deleteCourse(course: Course){
    this.homeService.deleteCourse(course.courseName).subscribe(data => {
      this.showCourses();
    });
  }
  updateCourse(course: Course){
    this.homeService.updateCourse(course).subscribe(data=>{
      this.showCourses();
    });
  }

  addApplicantToCourse(registerApplicant: ApplicantRegForm) {
    const applicant = {
      id: null,
      name: registerApplicant.name,
      email: registerApplicant.email,
      phoneNumber: registerApplicant.phoneNumber,
      address: registerApplicant.address,
      status: null,
      course: null
    };
    this.applicantService.addApplicantToCourse(applicant, registerApplicant.status, registerApplicant.courseName)
      .subscribe(data => this.showCourses());
  }

  logout() {
    this.authService.logout();
    this.applicant = null;
    this.location.replaceState('/');
    this.router.navigate(['/board']);
  }
  generateCertificate(email: string){
    this.pdfGenerateservice.downloadPDF(email);
  }
}
