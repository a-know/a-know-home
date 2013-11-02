package com.aknow.a_know_home.controller;

import java.util.Calendar;
import java.util.Map;
import java.util.TimeZone;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;
import org.slim3.memcache.Memcache;

import com.aknow.a_know_home.model.UploadBlobFile;
import com.aknow.a_know_home.util.PrivateConstants;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.Transaction;

public class UploadController extends Controller {

    private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    private final String password = PrivateConstants.HASHED_PASS;

    @Override
    public Navigation run() throws Exception {

        String send_pass = this.request.getParameter("password");
        Memcache.delete("photos");

        if(!this.password.equals(send_pass)){
            return forward("/");
        }

        @SuppressWarnings("deprecation")
        Map<String, BlobKey> blobs = this.blobstoreService.getUploadedBlobs(this.request);
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Tokyo"));

        BlobKey blobKey = blobs.get("file");
        String size_str = this.request.getParameter("size");
        Integer size = new Integer(size_str);

        Transaction tx = Datastore.beginTransaction();
        UploadBlobFile file = new UploadBlobFile();
        file.setBlobKey(blobKey);
        file.setImageSize(size);
        file.setUploadDate(calendar.getTime());
        Datastore.put(file);
        tx.commit();

        Memcache.delete("photos");

        return forward("/");
    }
}
