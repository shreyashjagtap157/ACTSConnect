package com.connect.acts.ActsConnectBackend.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CommentRequest {
    @NotBlank(message = "Text is required")
    private String text;

    @NotNull(message = "Post ID is required")
    private UUID postId;
}