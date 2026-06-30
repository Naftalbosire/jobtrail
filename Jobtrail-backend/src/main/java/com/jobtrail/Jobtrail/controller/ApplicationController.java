package com.jobtrail.Jobtrail.controller;
import com.jobtrail.Jobtrail.entity.Application;
import com.jobtrail.Jobtrail.entity.Attachment;
import com.jobtrail.Jobtrail.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.security.Principal;
import java.util.List;

// public class ApplicationController {
    
// }
@RestController @RequestMapping("/api/applications") @RequiredArgsConstructor
public class ApplicationController {
    private final ApplicationService appService;

    private String email(Principal p) { return p.getName(); }

    @GetMapping    public List<Application> getAll(Principal p) { return appService.getAll(email(p)); }
    @PostMapping   public Application create(@RequestBody Application app, Principal p) { return appService.create(app, email(p)); }
    @PutMapping("/{id}") public Application update(@PathVariable Long id, @RequestBody Application app, Principal p) { return appService.update(id, app, email(p)); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id, Principal p) { appService.delete(id, email(p)); }

    @PostMapping("/{id}/attachments")
    public ResponseEntity<?> upload(@PathVariable Long id, @RequestParam("file") MultipartFile file,
                                    @RequestParam("type") String type, Principal p) throws IOException {
        String name = file.getOriginalFilename();
        String size = (file.getSize() / 1024) + " KB";
        // Save file to disk or cloud — for now return metadata only
        Attachment att = appService.addAttachment(id, name, type, size, "", email(p));
        return ResponseEntity.ok(att);
    }
}