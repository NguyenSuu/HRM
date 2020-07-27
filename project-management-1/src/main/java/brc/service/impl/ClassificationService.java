package brc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import brc.models.Classification;
import brc.repository.ClassficationRepository;
import brc.service.IService;

@Service
public class ClassificationService implements IService<Classification>{
	@Autowired
	private ClassficationRepository classification;
	
	@Override
	public List<Classification> findAll() {
		
		return this.classification.findAll();
	}

	@Override
	public Classification save(Classification t) {
		
		return this.classification.save(t);
	}

	@Override
	public void remove(Long id) {
		this.classification.deleteById(id);
		
	}

}
