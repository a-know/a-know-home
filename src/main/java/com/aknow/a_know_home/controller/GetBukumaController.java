package com.aknow.a_know_home.controller;

import java.io.InputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import net.arnx.jsonic.JSON;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.memcache.Memcache;

import com.aknow.a_know_home.util.UtilityMethods;

import de.nava.informa.core.ItemIF;

public class GetBukumaController extends Controller {

    @Override
    public Navigation run() throws Exception {
        this.response.setContentType("application/json; charset=UTF-8");


        Map<String, ArrayList<Map<String, String>>> map = new LinkedHashMap<String, ArrayList<Map<String, String>>>();
        ArrayList<Map<String, String>> array = new ArrayList<Map<String, String>>();
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        
        Calendar cal1 = Calendar.getInstance();
        
        @SuppressWarnings("rawtypes")
		Collection list = UtilityMethods.getRss("http://b.hatena.ne.jp/a-know/rss", "yyyy-MM-dd-HH");

        @SuppressWarnings("unchecked")
        ItemIF[] items = (ItemIF[]) list.toArray(new ItemIF[0]);

        for (int i = 0; i < 10; i++) {
            Map<String, String> entry = new HashMap<String, String>();
            entry.put("target_title", items[i].getTitle());
            entry.put("target_url", items[i].getLink().toString());
            entry.put("comment", items[i].getDescription());
            Date tmpDate = (items[i].getDate());
            cal1.setTime(tmpDate);
            cal1.add(Calendar.HOUR, 9);
            entry.put("date", sdf1.format(cal1.getTime()));

            String url_str2 = "http://api.b.st-hatena.com/entry.count?url=" + URLEncoder.encode(items[i].getLink().toString(), "utf-8");
            String is_str = Memcache.get(url_str2);
            if(is_str == null){
                InputStream is = new URL(url_str2).openStream();
                is_str = UtilityMethods.inputStreemToString(is);
                Memcache.put(url_str2, is_str);
            }
            entry.put("hatebu_count", is_str);
            entry.put("hatebu_url", "http://b.hatena.ne.jp/entry/" + items[i].getLink().toString());
            array.add(entry);
        }
        map.put("entries", array);


        JSON.encode(map, this.response.getOutputStream());

        return null;
    }
}
