import { Component, OnInit, DoCheck } from '@angular/core';

import { IathletePreview } from '../profile/allUsers/IAthletePreview';
import { UserService } from '../../services/user.service';

import { Constants } from '../../constants/constants';
import { Router } from '@angular/router';

const AuthToken: string = Constants.authToken;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: any = null;
  
    //Athletes section
    public athletes: IathletePreview[] = [];
    public proAthletes: IathletePreview[] = [];
    public amateurAthletes: IathletePreview[] = [];

  public event: any;
  public currentActiveRound: any;
  public submissionActive: boolean = false;
  public votingActive: boolean = false;

  public selectedCategory: string = 'recent';
  public videos: any[];
  public mostPopular: any[] = [];
  public mostRecent: any[] = [];
  public spotlighted: any[] = [];
  public currentVideo: any;
  public currentIndex: number;


  public error: boolean = false;
  public errorMessage: string;
  public mainImage: string;


  public slickOptionsNews: any = {
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      arrows: false
  };

  public feed: [any];


  constructor(
      public userService: UserService,
      public router: Router

  ) {
  }

  public ngDoCheck(): void {
      this.user = this.userService.loggedUser
  }

  public ngOnInit(): void {
      this.user = this.userService.loggedUser;
  }
}
