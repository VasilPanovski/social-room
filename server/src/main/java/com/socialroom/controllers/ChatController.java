package com.socialroom.controllers;

import com.socialroom.entities.chat.Chat;
import com.socialroom.models.bindingModels.ChatInvitationModel;
import com.socialroom.models.bindingModels.NotificationBindingModel;
import com.socialroom.models.viewModels.ChatViewModel;
import com.socialroom.services.interfaces.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@CrossOrigin
@RequestMapping("api")
public class ChatController {

    private final SimpMessagingTemplate template;
    private final ChatService chatService;

    @Autowired
    public ChatController(SimpMessagingTemplate template, ChatService chatService) {
        this.template = template;
        this.chatService = chatService;
    }

    @PostMapping("/chat/invitation")
    public ResponseEntity inviteToChat(@RequestBody ChatInvitationModel chatInvitationModel) {
        ChatViewModel chatModel = this.chatService.findAndLoadChat(chatInvitationModel.getSender(), chatInvitationModel.getReceiver());
        return new ResponseEntity<>(chatModel, HttpStatus.OK);
    }

    @GetMapping("/chat/getChat/{chatId}")
    public ResponseEntity loadChat(@PathVariable Long chatId) {
        Chat chat = this.chatService.findChatById(chatId);
        System.out.println(chatId);
        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @PostMapping("/notifications/save")
    public ResponseEntity saveNotification(@RequestBody NotificationBindingModel notificationBindingModel) {
        this.chatService.saveNotification(notificationBindingModel);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/notifications/MarkAsRead/{id}")
    public ResponseEntity MarkNotificationAsRead(@PathVariable Long id) {
        this.chatService.markNotificationAsSeen(id);
        return new ResponseEntity(HttpStatus.OK);
    }

}
