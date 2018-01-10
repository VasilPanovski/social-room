package com.socialroom.entities.chat;

import com.socialroom.entities.user.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "chats")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(mappedBy = "chat")
    private List<ChatMessage> messages;

    @ManyToMany(mappedBy = "chats")
    private Set<User> chatters;

    public Chat() {
        this.messages = new ArrayList<>();
        this.chatters = new HashSet<>();
    }

    public Chat(List<ChatMessage> messages) {
        this.messages = messages;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<ChatMessage> getMessages() {
        return messages;
    }

    public void setMessages(List<ChatMessage> messages) {
        this.messages = messages;
    }

    public Set<User> getChatters() {
        return chatters;
    }

    public void setChatters(Set<User> chatters) {
        this.chatters = chatters;
    }
}
