package com.ability.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

/**
 * 
 * @author 정규현
 * @summary 스케줄러 설정
 *
 */

@Configuration
public class SchedulerConfig implements SchedulingConfigurer {
	private final int POOL_SIZE=10;
	
	
	@Override
	public void configureTasks(ScheduledTaskRegistrar scheduledTaskRegistrar) {
		ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
		
		threadPoolTaskScheduler.setPoolSize(POOL_SIZE);
		threadPoolTaskScheduler.setThreadNamePrefix("tags-Auto-Insert-scheduled-task-pool-");
		threadPoolTaskScheduler.initialize();
		
		scheduledTaskRegistrar.setTaskScheduler(threadPoolTaskScheduler);
		
	}
	
}
