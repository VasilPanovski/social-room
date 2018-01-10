package com.socialroom.services;

import com.socialroom.entities.chat.Chat;
import com.socialroom.entities.chat.ChatMessage;
import com.socialroom.entities.chat.Notification;
import com.socialroom.entities.user.User;
import com.socialroom.models.bindingModels.ChatMessegeBindingModel;
import com.socialroom.models.bindingModels.NotificationBindingModel;
import com.socialroom.models.viewModels.ChatViewModel;
import com.socialroom.repositories.ChatMessageRepository;
import com.socialroom.repositories.ChatRepository;
import com.socialroom.repositories.NotificationRepository;
import com.socialroom.repositories.UserRepository;
import com.socialroom.services.interfaces.ChatService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final NotificationRepository notificationRepository;
    private final ChatMessageRepository chatMessageRepository;

    @Autowired
    public ChatServiceImpl(ChatRepository chatRepository, UserRepository userRepository, ModelMapper modelMapper, NotificationRepository notificationRepository, ChatMessageRepository chatMessageRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.notificationRepository = notificationRepository;
        this.chatMessageRepository = chatMessageRepository;
    }

    @Transactional
    @Override
    public ChatViewModel findAndLoadChat(Long senderId, Long receiverId) {
        User sender = this.userRepository.findOne(senderId);
        User receiver = this.userRepository.findOne(receiverId);

        Chat chat1 = this.chatRepository.findOneByChatters(sender);
        Chat chat2 = this.chatRepository.findOneByChatters(receiver);
        if ((chat1 != null && chat2 != null) && (chat1.getId() == chat2.getId())) {
            return this.modelMapper.map(chat1, ChatViewModel.class);

        }

        List<ChatMessage> messages = new ArrayList<>();
        Chat newChat = new Chat(messages);
        this.chatRepository.save(newChat);
        sender.getChats().add(newChat);
        receiver.getChats().add(newChat);
        return this.modelMapper.map(newChat, ChatViewModel.class);
    }

    @Override
    public void saveNotification(NotificationBindingModel notificationBindingModel) {

        User receiver = this.userRepository.findOne(notificationBindingModel.getUser());
        User sender = this.userRepository.findOne(notificationBindingModel.getSenderId());

        Notification notification = new Notification(
                notificationBindingModel.getNotificationTitle(),
                notificationBindingModel.getNotificationText(),
                sender, receiver
                );
        notification.setCreatedAt(new Date());
        this.notificationRepository.save(notification);

    }

    @Override
    public void saveMessage(ChatMessegeBindingModel messegeBindingModel) {
        if (messegeBindingModel.getMessage().isEmpty()) {
            return;
        }

        User receiver = this.userRepository.findOne(messegeBindingModel.getUser());
        User sender = this.userRepository.findOne(messegeBindingModel.getSenderId());

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setContent(messegeBindingModel.getMessage());
        chatMessage.setSender(sender);
        chatMessage.setReceiver(receiver);
        chatMessage.setDate(new Date());

        this.chatMessageRepository.save(chatMessage);

    }

    @Override
    public Chat getChatById(Long chatId) {
        return this.chatRepository.findOne(chatId);
    }

    @Override
    public Chat findChatById(Long id) {
        return this.chatRepository.findOne(id);
    }

    @Override
    public void markNotificationAsSeen(Long id) {
        Notification notification = this.notificationRepository.findOne(id);
        notification.setSeen(true);
        notificationRepository.save(notification);
    }
}
