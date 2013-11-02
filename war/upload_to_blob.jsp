<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory" %>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreService" %>

<%
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
%>


<html>
    <head>
        <title>Upload to blob</title>
    </head>
    <body>
        <form action="<%= blobstoreService.createUploadUrl("/upload") %>" method="post" enctype="multipart/form-data" onSubmit="return uploadButtonClick()" name="uploadForm">
            <input type="file" name="file">
            <select id="size" name="size">
              <option value="32">32</option>
              <option value="48">48</option>
              <option value="64">64</option>
              <option value="72">72</option>
              <option value="80">80</option>
              <option value="90">90</option>
              <option value="94">94</option>
              <option value="104">104</option>
              <option value="110">110</option>
              <option value="120">120</option>
              <option value="128">128</option>
              <option value="144">144</option>
              <option value="150">150</option>
              <option value="160">160</option>
              <option value="200">200</option>
              <option value="220">220</option>
              <option value="288">288</option>
              <option value="320">320</option>
              <option value="400">400</option>
              <option value="512">512</option>
              <option value="576">576</option>
              <option value="640">640</option>
              <option value="720">720</option>
              <option value="800">800</option>
              <option value="912">912</option>
              <option value="1024">1024</option>
              <option value="1152">1152</option>
              <option value="1280">1280</option>
              <option value="1440">1440</option>
              <option value="1600">1600</option>
            </select>
            <input type="password" name="password" id="password">
            <input type="submit" value="Submit">
        </form>
    <script src="/js/upload.js"></script>
    <script src="/js/sha256.js"></script>
    </body>
</html>