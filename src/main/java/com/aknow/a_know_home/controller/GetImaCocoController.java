package com.aknow.a_know_home.controller;

import java.net.URL;
import java.util.LinkedHashMap;

import net.arnx.jsonic.JSON;

import org.scribe.builder.ServiceBuilder;
import org.scribe.builder.api.DefaultApi10a;
import org.scribe.model.OAuthRequest;
import org.scribe.model.Response;
import org.scribe.model.Token;
import org.scribe.model.Verb;
import org.scribe.oauth.OAuthService;
import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

import com.aknow.a_know_home.util.PrivateConstants;

public class GetImaCocoController extends Controller {

    @SuppressWarnings("unchecked")
    @Override
    public Navigation run() throws Exception {
        this.response.setContentType("application/json; charset=UTF-8");

        DefaultApi10a api = new DefaultApi10a() {
            @Override
            public String getRequestTokenEndpoint() {
                return "https://www.hatena.com/oauth/initiate";
            }

            public String getAuthorizationUrl(Token arg0) {
                return "https://www.hatena.ne.jp/oauth/authorize?oauth_token=" + arg0.getToken();
            }

            @Override
            public String getAccessTokenEndpoint() {
                return "https://www.hatena.com/oauth/token";
            }
        };

        OAuthService service = new ServiceBuilder().provider(api)
                .apiKey(PrivateConstants.HATENA_API_KEY).apiSecret(PrivateConstants.HATENA_API_SECRET).scope("read_public").build();

        Token accessToken = new Token(PrivateConstants.HATENA_ACCESS_TOKEN, PrivateConstants.HATENA_TOKEN_SECRET);

        OAuthRequest req = new OAuthRequest(Verb.GET, "http://c.hatena.com/api/v1/history.json?name=a-know&l=10");

        service.signRequest(accessToken, req);

        Response res = null;
        int i = 0;
        while(res == null){
            try{
                res = req.send();
            }catch(Exception e){
                i++;
                if(i > 10){
                    throw e;
                }
            }
        }


        @SuppressWarnings("rawtypes")
        LinkedHashMap lmap = (LinkedHashMap) JSON.decode(res.getBody());

        Object stats = JSON.decode(new URL("http://c.hatena.com/a-know/stats.json").openStream());
        lmap.put("stats", stats);

        JSON.encode(lmap, this.response.getOutputStream());

        return null;
    }
}
