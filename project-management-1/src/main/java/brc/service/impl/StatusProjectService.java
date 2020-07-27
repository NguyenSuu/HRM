package brc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import brc.models.StatusProject;
import brc.repository.StatusProjectRepository;
import brc.service.IService;

@Service
public class StatusProjectService implements IService<StatusProject> {

	@Autowired
	private StatusProjectRepository statusRepos;

	@Override
	public List<StatusProject> findAll() {
		return this.statusRepos.findAll();
	}

	
	public StatusProject findById(Long id) {
		return this.statusRepos.findEntity(id);
	}

	@Override
	public StatusProject save(StatusProject t) {
		return this.statusRepos.save(t);
	}

	@Override
	public void remove(Long id) {

		this.statusRepos.deleteById(id);
	}

	public StatusProject findByName(String name) {
		return this.statusRepos.findByName(name);
	}
}
