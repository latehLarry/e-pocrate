import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-doctor-message',
  templateUrl: './doctor-message.component.html',
  styleUrls: ['./doctor-message.component.css']
})
export class DoctorMessageComponent implements OnInit {
  isLoading = false;
  typedMessage = '';
  conversations: any = [{
    contact: {
      name: "Fallou",
      surname: "Fall",
      id: "test2"
    },
    messages: [{
      sentBy: "test",
      sentTo: "test2",
      message: "Bonjour",
    }, {
      sentTo: "test",
      sentBy: "test2",
      message: "Hello comment ça va?",
    }]
  }, {
    contact: {
      name: "Christian",
      surname: "Lam",
      id: "test3"
    },
    messages: [{
      sentTo: "test",
      sentBy: "test2",
      message: "Bonjour docteur",
    }, {
      sentBy: "test",
      sentTo: "test3",
      message: "Bonjour Mr que puisse faire pour vous ?",
    }]
  }];
  selectedConversation = null;
  doctor = {
    id: "test"
  }
  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.doctorService.loadDoctorConversations()
      .subscribe(data => {
        this.conversations = data;
      });
    this.selectedConversation = this.conversations[0];
  }

  getConversationPreview(conversation) {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    return lastMessage ? lastMessage.message.split(0, 10) : "C'est le début de votre conversation."
  }

  displayConversation(conversation) {
    this.selectedConversation = conversation;
  }

  sendNewMessage() {
    const message = this.typedMessage;
    console.log(message, "mesage")
    if (message && message.length >= 1) {
      this.selectedConversation.messages.push({
        sentTo: this.selectedConversation.contact.id,
        sentBy: this.doctor.id,
        message,
      });
      this.typedMessage = '';
    }
  }

}
