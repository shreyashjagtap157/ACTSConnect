package com.connect.acts.ActsConnectBackend.controller;

import com.connect.acts.ActsConnectBackend.dto.UserSearchRequest;
import com.connect.acts.ActsConnectBackend.model.User;
import com.connect.acts.ActsConnectBackend.service.CommentService;
import com.connect.acts.ActsConnectBackend.service.PostService;
import com.connect.acts.ActsConnectBackend.service.UserService;
import com.connect.acts.ActsConnectBackend.utils.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.asyncDispatch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.request;
import org.springframework.test.web.servlet.MvcResult;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private UserService userService;

    @Mock
    private PostService postService;

    @Mock
    private CommentService commentService;

    @InjectMocks
    private UserController userController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void searchUsers_Success() throws Exception {
        String token = "Bearer dummy_token";
        String email = "test@example.com";

        User loggedInUser = new User();
        loggedInUser.setEmail(email);

        UUID user1Id = UUID.randomUUID();
        UUID user2Id = UUID.randomUUID();
        User foundUser1 = new User();
        foundUser1.setId(user1Id);
        User foundUser2 = new User();
        foundUser2.setId(user2Id);

        List<User> searchResults = Arrays.asList(foundUser1, foundUser2);

        UserSearchRequest searchRequest = new UserSearchRequest();
        searchRequest.setName("John");

        when(jwtUtil.extractEmail("dummy_token")).thenReturn(email);
        when(userService.findByEmail(email)).thenReturn(loggedInUser);
        when(userService.searchUsers(any(UserSearchRequest.class))).thenReturn(searchResults);

        mockMvc.perform(post("/api/user/search")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(searchRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Users found"))
                .andExpect(jsonPath("$.data[0]").value(user1Id.toString()))
                .andExpect(jsonPath("$.data[1]").value(user2Id.toString()));
    }

    @Test
    void searchUsersAsync_Success() throws Exception {
        String token = "Bearer dummy_token";
        String email = "test@example.com";

        User loggedInUser = new User();
        loggedInUser.setEmail(email);

        UUID user1Id = UUID.randomUUID();
        UUID user2Id = UUID.randomUUID();
        User foundUser1 = new User();
        foundUser1.setId(user1Id);
        User foundUser2 = new User();
        foundUser2.setId(user2Id);

        List<User> searchResults = Arrays.asList(foundUser1, foundUser2);

        UserSearchRequest searchRequest = new UserSearchRequest();
        searchRequest.setName("John");

        when(jwtUtil.extractEmail("dummy_token")).thenReturn(email);
        when(userService.findByEmail(email)).thenReturn(loggedInUser);
        when(userService.searchUsers(any(UserSearchRequest.class))).thenReturn(searchResults);


        MvcResult mvcResult = mockMvc.perform(post("/api/user/search/async")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(searchRequest)))
                .andExpect(request().asyncStarted())
                .andReturn();

        mockMvc.perform(asyncDispatch(mvcResult))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Users found"))
                .andExpect(jsonPath("$.data[0]").value(user1Id.toString()))
                .andExpect(jsonPath("$.data[1]").value(user2Id.toString()));
    }

    @Test
    void searchUsers_Unauthorized() throws Exception {
        String token = "Bearer dummy_token";
        String email = "test@example.com";

        UserSearchRequest searchRequest = new UserSearchRequest();
        searchRequest.setName("John");

        when(jwtUtil.extractEmail("dummy_token")).thenReturn(email);
        when(userService.findByEmail(email)).thenReturn(null);

        mockMvc.perform(post("/api/user/search")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(searchRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Unauthorized"));
    }
}
