package com.connect.acts.ActsConnectBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Getter
@Setter
@AllArgsConstructor
public class PostDTO {
  private UUID id;
  private String title;
  private String content;
  private boolean isDummy;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private UUID userId; // minimal user info
  private String name; // minimal user info
  private java.util.List<UUID> likedByUsers; // to track likes
  private boolean likedByRequser; // if frontend needs it explicitly



  public PostDTO(UUID id, String title, String content, boolean isDummy, LocalDateTime createdAt, LocalDateTime updatedAt, UUID userId, String name) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.isDummy = isDummy;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.userId = userId;
      this.name = name;
  }

  public PostDTO(UUID id, String title, String content, LocalDateTime createdAt, UUID id1) {

  }

}
