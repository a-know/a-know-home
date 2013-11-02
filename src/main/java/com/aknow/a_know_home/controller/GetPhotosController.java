package com.aknow.a_know_home.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.arnx.jsonic.JSON;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;
import org.slim3.memcache.Memcache;

import com.aknow.a_know_home.meta.UploadBlobFileMeta;
import com.aknow.a_know_home.model.UploadBlobFile;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;

public class GetPhotosController extends Controller {

    @SuppressWarnings("deprecation")
	@Override
    public Navigation run() throws Exception {
        this.response.setContentType("application/json; charset=UTF-8");

        Map<String, List<Map<String, String>>> returnMap = new HashMap<String, List<Map<String, String>>>();
        List<Map<String, String>> array = new ArrayList<Map<String, String>>();

        array = Memcache.get("photos");

        if(array == null){
            array = new ArrayList<Map<String, String>>();
            UploadBlobFileMeta meta = new UploadBlobFileMeta();
            List<UploadBlobFile> list = Datastore.query(meta).sort(meta.uploadDate.desc).limit(8).asList();
            SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            Calendar cal1 = Calendar.getInstance();


            ImagesService imagesService = null;
            imagesService = ImagesServiceFactory.getImagesService();

            for(UploadBlobFile e : list){
                Map<String, String> map = new HashMap<String, String>();

                map.put("thumbnail_url", imagesService.getServingUrl(e.getBlobKey(), 100, true));
                map.put("image_url", imagesService.getServingUrl(e.getBlobKey(), e.getImageSize().intValue(), false));
                Date tmpDate = (e.getUploadDate());
                cal1.setTime(tmpDate);
                cal1.add(Calendar.HOUR, 9);
                map.put("date", sdf1.format(cal1.getTime()));
                array.add(map);
            }
            Memcache.put("photos", array);
        }
        returnMap.put("images", array);

        JSON.encode(returnMap, this.response.getOutputStream());

        return null;
    }
}
