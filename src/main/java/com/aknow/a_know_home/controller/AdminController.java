package com.aknow.a_know_home.controller;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

import com.aknow.a_know_home.util.PrivateConstants;

public class AdminController extends Controller {

    private final String password = PrivateConstants.HASHED_PASS;

    @Override
    public Navigation run() throws Exception {

        String function = requestScope("function");
        String send_pass = requestScope("password");

        if(!this.password.equals(send_pass)){
            return this.forward("/");
        }else{
        	return this.redirect(PrivateConstants.ADMIN_MENU.get(function));
        }
    }
}
