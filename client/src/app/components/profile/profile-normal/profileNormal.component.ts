import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Constants } from '../../../constants/constants'

const AuthToken: string = Constants.authToken;

@Component({
    templateUrl: './profileNormal.component.html',
    styleUrls: ['./profileNormal.component.css']

})

export class ProfileNormalComponent implements OnInit {
    public contentLoaded = false;

    private userToShow;
    private mainImage: string;
    private showPopup : boolean = false;
    private video: any;
    private doNotshowUserActions: boolean;
    private logUser: any; 

    changeImage(image): void {
        this.mainImage = image;
    }

    openPopup(video): void { 
        console.log(video) 
        this.video = video;
        this.showPopup = true;
    }

    closePopup(): void { 
        this.showPopup = false; 
    } 

    constructor(
        private userService: UserService,
        private route: ActivatedRoute
    ) { }
    

    public ngOnInit(): void {
        this.logUser = this.userService.loggedUser;
        let token = localStorage.getItem(AuthToken);
        let userId: string = (<any>this.route.params)._value.id; 
        this.userService.getUserData(userId)
        .subscribe(x => {
            this.userToShow = x;
            this.mainImage = this.userToShow.images[0];
            this.contentLoaded = true; 
            if(this.logUser){
                this.doNotshowUserActions = this.checkIfProfileIsLogedUser(this.logUser.id,this.userToShow._id )
            }            
             
        },
        (error) => {
            console.log(error);
            this.contentLoaded = true;

        });
        
        //Check for user if page is refreshed
		if (token && !this.logUser) {
			this.userService
				.getLoggedUser()
				.subscribe((x) => {
					this.userService.loggedUser = x.user;
                    this.logUser = this.userService.loggedUser;  
                    this.doNotshowUserActions = this.checkIfProfileIsLogedUser(this.logUser.id,this.userToShow._id )
				},
				(err) => {
					localStorage.removeItem(AuthToken); 
				}); 
		}
    }

    public checkIfProfileIsLogedUser (logUserId, userToShowId) { 
        if(logUserId == userToShowId) { 
            return true;
        } else { 
            return false;
        }
    }
}
