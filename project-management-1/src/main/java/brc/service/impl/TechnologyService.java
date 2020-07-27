package brc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import brc.models.Technology;
import brc.repository.TechnologyRepository;
import brc.service.IService;

@Service
public class TechnologyService implements IService<Technology>{
	@Autowired
	private TechnologyRepository technologyRes;
	@Override
	public List<Technology> findAll() {
		// TODO Auto-generated method stub
		return this.technologyRes.findAll();
	}

	@Override
	public Technology save(Technology t) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void remove(Long id) {
		// TODO Auto-generated method stub
		
	}

}
