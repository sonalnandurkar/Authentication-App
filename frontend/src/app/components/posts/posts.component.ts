import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/User";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit {
 

  userId: Pick<User, "id">;
  selecteduser:any

  constructor(private authService: AuthService) {}

  openchat(){
    window.addEventListener('message', function(event){
    if(event.data.applicationName=='EpochChat'){
      // var iframewindow=document.getElementById('mywindow').contentWindow;
      var iframewindow: HTMLIFrameElement = document.getElementById('mywindow') as HTMLIFrameElement;
      var element = iframewindow.contentWindow;
      let dataToSend = {
          "senderUserDetails": { "name": "Sonal Nandurkar" ,  "uniqueId": "sonalnandurkar3@gmail.com"  },
          "eventName": "openEpochChat",
          "channelName": "demo-chat", 
        }
        element.postMessage(dataToSend,'*');
        //setTimeout(function(){iframewindow.postMessage(dataToSend1,'*')}, 10000);
        }
      });
       
  }

  ngOnInit(): void {
   this.selecteduser 
  
  }
 
}
