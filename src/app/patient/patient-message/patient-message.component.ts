import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient/patient.service';

@Component({
  selector: 'app-patient-message',
  templateUrl: './patient-message.component.html',
  styleUrls: ['./patient-message.component.css']
})
export class PatientMessageComponent implements OnInit {
  isLoading = false;
  typedMessage = '';
  conversations: any = [];
  selectedConversation = null;
  doctor = {
    id: "test"
  }
  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    // this.patientService.loadPatientConversations()
    //   .subscribe(data => {
    //     this.conversations = data;
    //   });
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
