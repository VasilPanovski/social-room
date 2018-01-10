package com.socialroom.services.interfaces;

import com.socialroom.entities.chat.Chat;
import com.socialroom.models.bindingModels.ChatMessegeBindingModel;
import com.socialroom.models.bindingModels.NotificationBindingModel;
import com.socialroom.models.viewModels.ChatViewModel;

public interface ChatService {

    ChatViewModel findAndLoadChat(Long senderId, Long receiverId);

    void saveNotification(NotificationBindingModel notificationBindingModel);

    void saveMessage(ChatMessegeBindingModel messegaBindingModel);

    Chat getChatById(Long chatId);

    Chat findChatById(Long id);

    void markNotificationAsSeen(Long id);
}
