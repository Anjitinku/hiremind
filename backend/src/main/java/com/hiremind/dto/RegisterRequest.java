package com.hiremind.dto;
import com.hiremind.model.Role;
import lombok.Data;
@Data public class RegisterRequest { private String name; private String email; private String password; private Role role; }
