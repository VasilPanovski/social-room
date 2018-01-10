package com.socialroom.controllers;

import com.socialroom.entities.chat.Chat;
import com.socialroom.models.bindingModels.ChatMessegeBindingModel;
import com.socialroom.services.interfaces.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.View;

@RestController
@CrossOrigin
public class MessageController {

    private final ChatService chatService;

    @Autowired
    public MessageController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/chat/{chadId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity getChat(@PathVariable Long chatId) {
        Chat chat = this.chatService.getChatById(chatId);

        return new ResponseEntity(chat, HttpStatus.OK);
    }

    // /app/chat
    @MessageMapping("chat")
    public void receiveMessage(@RequestBody ChatMessegeBindingModel messegeBindingModel) {

        this.chatService.saveMessage(messegeBindingModel);
    }

    @MessageMapping("/send-message")
    public void saveMessage(@RequestBody ChatMessegeBindingModel messegeBindingModel) {

        this.chatService.saveMessage(messegeBindingModel);
    }
}
