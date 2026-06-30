package com.jobtrail.Jobtrail.service;
import com.jobtrail.Jobtrail.entity.Application;
import com.jobtrail.Jobtrail.entity.Attachment;
import com.jobtrail.Jobtrail.entity.User;
import com.jobtrail.Jobtrail.repository.ApplicationRepository;
import com.jobtrail.Jobtrail.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

// public class ApplicationService {
    
// }
@Service @RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository appRepo;
    private final UserRepository userRepo;

    private User getUser(String email) {
        return userRepo.findByEmail(email).orElseThrow();
    }

    public List<Application> getAll(String email) {
        return appRepo.findByUserId(getUser(email).getId());
    }

    public Application create(Application app, String email) {
        app.setUser(getUser(email));
        return appRepo.save(app);
    }

    public Application update(Long id, Application updated, String email) {
        Application app = appRepo.findById(id).orElseThrow();
        if (!app.getUser().getEmail().equals(email)) throw new RuntimeException("Forbidden");
        updated.setId(id); updated.setUser(app.getUser());
        return appRepo.save(updated);
    }

    public void delete(Long id, String email) {
        Application app = appRepo.findById(id).orElseThrow();
        if (!app.getUser().getEmail().equals(email)) throw new RuntimeException("Forbidden");
        appRepo.delete(app);
    }

    public Attachment addAttachment(Long appId, String name, String type, String size, String url, String email) {
        Application app = appRepo.findById(appId).orElseThrow();
        if (!app.getUser().getEmail().equals(email)) throw new RuntimeException("Forbidden");
        Attachment att = Attachment.builder().name(name).type(type).size(size).url(url).application(app).build();
        app.getAttachments().add(att);
        appRepo.save(app);
        return att;
    }
}