package com.socialroom.entities.user;

import javax.persistence.*;

@Entity(name = "user_images")
public class UserImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "picture_url")
    private String profilPicUrl;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User owner;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProfilPicUrl() {
        return profilPicUrl;
    }

    public void setProfilPicUrl(String profilPicUrl) {
        this.profilPicUrl = profilPicUrl;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
