package brc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import brc.models.ClassificationProject;
import brc.repository.ClassificationProjectRepository;
import brc.service.IService;

public class ClassificationProjectService implements IService<ClassificationProject> {
	@Autowired
	private ClassificationProjectRepository classificationProject;

	@Override
	public List<ClassificationProject> findAll() {

		return this.classificationProject.findAll();
	}

	@Override
	public ClassificationProject save(ClassificationProject t) {

		return this.classificationProject.save(t);
	}

	@Override
	public void remove(Long id) {

		this.classificationProject.deleteById(id);
	}

}
