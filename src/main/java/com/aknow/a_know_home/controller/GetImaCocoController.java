package com.aknow.a_know_home.controller;

import java.net.URL;
import java.util.LinkedHashMap;

import net.arnx.jsonic.JSON;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

import com.aknow.a_know_home.util.PrivateConstants;
import com.google.appengine.api.urlfetch.HTTPResponse;
import com.google.appengine.api.urlfetch.URLFetchService;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;

public class GetImaCocoController extends Controller {

    @Override
    public Navigation run() throws Exception {
        this.response.setContentType("application/json; charset=UTF-8");
        
        URLFetchService ufs = URLFetchServiceFactory.getURLFetchService();
        URL url = new URL("https://api.foursquare.com/v2/users/self/checkins?oauth_token=" + PrivateConstants.FPURSQUARE_ACCESSS_TOKEN + "&v=20140525");
        HTTPResponse response = ufs.fetch(url);
        byte[] content = response.getContent();
        
        @SuppressWarnings("rawtypes")
		LinkedHashMap foursquareLmap = (LinkedHashMap) JSON.decode(new String(content, "UTF-8"));
        @SuppressWarnings("rawtypes")
		LinkedHashMap lmap = (LinkedHashMap) foursquareLmap.get("response");
        
        JSON.encode(lmap, this.response.getOutputStream());

        return null;
    }
}
