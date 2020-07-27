package brc.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import brc.models.LevelProject;
import brc.repository.LevelProjectRepository;
import brc.service.IService;

@Service
public class LevelProjectService implements IService<LevelProject> {
	
	@Autowired
	private LevelProjectRepository levelRepos;
	
	@Override
	public List<LevelProject> findAll() {
		return this.levelRepos.findAll();
	}

	public LevelProject findById(Long id) {
		return this.levelRepos.findEntity(id);
	}

	@Override
	public LevelProject save(LevelProject t) {

		return this.levelRepos.save(t);
	}

	@Override
	public void remove(Long id) {
		this.levelRepos.deleteById(id);
	}
	
	public LevelProject findByName(String name) {
		return this.levelRepos.findByName(name);
	}
}
