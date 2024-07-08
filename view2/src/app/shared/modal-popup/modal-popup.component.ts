import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-modal-popup',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,TagInputModule],
  templateUrl: './modal-popup.component.html',
  styleUrl: './modal-popup.component.css'
})
export class ModalPopupComponent {

  private accessTokenKey = 'access_token';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private cookieService:CookieService,
    private toastr: ToastrService
  ){}

  @Input('showmodal')
  showmodal = true;
 
  @Output('close')
  onClose = new EventEmitter();

  disableaddRequirementsBodyScrolling(){
    document.body.style.setProperty('overflow','hidden')
  }

  enableaddRequirementsBodyScrolling(){
    document.body.style.setProperty('overflow','scroll')
  }

  ngOnInit(): void{
    this.addRequirementsInit()
  }

  ngOnChanges(): void{
    this.addRequirementsInit()
  }

  addRequirementsInit(){
    if(this.showmodal){
      this.disableaddRequirementsBodyScrolling()
    }
    else {
      this.enableaddRequirementsBodyScrolling()
    }
  }

  closeaddRequirements(){
    this.enableaddRequirementsBodyScrolling()
    this.onClose.emit()
  }
  

  requirements: any[] = [];

  showErrorMessage: boolean = false;

  validateAndSubmit(): void {
    // Filter out empty tags
    const filteredRequirements = this.requirements
      .filter(tag => typeof tag === 'string' ? tag.trim() !== '' : tag.value.trim() !== '');

    // Check if the filtered requirements are empty
    if (filteredRequirements.length === 0) {
      this.showErrorMessage = true;
    } else {
      this.showErrorMessage = false;
      this.isLoading = true;
      this.submitRequirements(filteredRequirements);
    }
  }

  @Output() querySubmitted = new EventEmitter<void>();

  submitRequirements(filteredRequirements: any[]) {
    const accessToken = this.cookieService.get(this.accessTokenKey);
  
    // Make HTTP request to fetch job details using the provided jobId
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
  
    filteredRequirements = this.requirements
      .filter(tag => typeof tag === 'string' ? tag.trim() !== '' : tag.value.trim() !== '')
      .map(tag => typeof tag === 'string' ? tag : tag.value);
  
    this.authService.getUserData().subscribe(
      (userData) => {
        const userId = userData.id;
  
        const payload = {
          query: filteredRequirements,
          user_id: userId
        };
  
        this.http.post<any>(`${environment.api_url}/api/query`, payload, { headers: headers }).subscribe(
          (response) => {
            console.log('query submitted successfully:', response);
            this.showmodal = false;
            this.isLoading = false;
            this.toastr.success('Query Submitted', 'Successfully!');
            this.querySubmitted.emit();
          },
          (error) => {
            console.error('Error generating query:', error);
            this.isLoading = false;
            this.toastr.success('Query', 'Not Submitted!');
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.isLoading = false;
      }
    );
  }
  




  
}