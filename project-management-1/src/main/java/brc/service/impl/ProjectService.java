package brc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import brc.models.Project;
import brc.repository.ProjectRepository;
import brc.service.IService;

@Service
public class ProjectService implements IService<Project> {

	@Autowired
	private ProjectRepository projectRepos;

	@Override
	public List<Project> findAll() {

		return null;
	}
	
	public List<Project> findAll(Specification<Project> specification) {

		return this.projectRepos.findAll(specification);
	}
	
	public String count(Long id) {
		return this.projectRepos.count(id);
	}

	public List<Project> findAllAsArray() {

		return this.projectRepos.findAllAsArray();
	}

	public Project findById(Long id) {

		return this.projectRepos.findEntity(id);
	}

	@Override
	public Project save(Project t) {

		return this.projectRepos.save(t);
	}

	@Override
	public void remove(Long id) {
		this.projectRepos.deleteById(id);

	}

	public Project findByName(String name) {
		return this.projectRepos.findByName(name);
	}

}
