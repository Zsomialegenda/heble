import { Component, OnInit } from '@angular/core';
import { Experience } from '../experience';
import { ExperienceService } from '../experience.service';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-coaching',
  imports: [],
  templateUrl: './coaching.component.html',
  styleUrl: './coaching.component.css'
})
export class CoachingComponent implements OnInit {
  constructor(private experienceService:ExperienceService, private userService:UserService) { }
  
  experience:Experience={id:0, userId:0, level:0, xp:0,  xpToNextLevel:0}

  
  userID:any;
  ngOnInit(): void {
    this.userID = this.userService.getUserID()
    this.experienceService.getExp(this.userID).subscribe({
      next:(res:any)=> {

        this.experience = res.data;
      },
      error:(err:HttpErrorResponse)=> {
        alert(err.message);
      }
    })
  }

  exercises:any
}
