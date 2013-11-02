package com.aknow.a_know_home.util;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collection;

import org.slim3.memcache.Memcache;

import de.nava.informa.core.ChannelIF;
import de.nava.informa.core.ParseException;
import de.nava.informa.impl.basic.ChannelBuilder;
import de.nava.informa.parsers.RSSParser;

public class UtilityMethods {
    public static String inputStreemToString(InputStream in) throws IOException{

        BufferedReader reader =
            new BufferedReader(new InputStreamReader(in, "UTF-8"));
        StringBuffer buf = new StringBuffer();
        String str;
        while ((str = reader.readLine()) != null) {
                buf.append(str);
                buf.append("\n");
        }
        return buf.toString();
    }
    public static InputStream stringToInputStream(String str) {
        InputStream bais = new ByteArrayInputStream(str.getBytes());
        return bais;
    }
    
    @SuppressWarnings("rawtypes")
	public static Collection getRss(String targetUrl, String sdf) throws IOException, ParseException{

        SimpleDateFormat sdf2 = new SimpleDateFormat(sdf);
        Calendar cal1 = Calendar.getInstance();

        String url_str1 = targetUrl + "?" + sdf2.format(cal1.getTime());
        ChannelIF channel = Memcache.get(url_str1);
        if(channel == null){
            URL url = new URL(url_str1);
            channel = RSSParser.parse(new ChannelBuilder(), url);
            Memcache.put(url_str1, channel);
        }
        return channel.getItems();
    	
    }
}
