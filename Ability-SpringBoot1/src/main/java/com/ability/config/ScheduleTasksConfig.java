package com.ability.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ability.service.MainService;

/**
 * @author 정규현
 * @summary 스케줄러 구현( 9시부터 23시까지 매 시간 48분마다 스케줄러가 작동함 )
 */

@Component
public class ScheduleTasksConfig {
	

	@Autowired
	MainService service;
	
	@Scheduled(cron="0 48 9-23 * * *") 
	public void insertTags() {
		service.getSelectAllTags();
	}
}