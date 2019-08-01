package com.ability.dto;

import java.util.Date;

public class Job_Board {
  private int id;
  private int userid;
  private int enabled;
  private Date date_created;
  private Date last_updated;
  private int view_count;
  private String title;
  private String content;
  private String tags;
  private String job_type;
  private String job_time;
  private String job_dept;
  private String scale;
  private String email;
  private int closed;
  private String phone;
  private String period;
  private int category_id;
  private int accuse;
  private String subtitle;
  private String career;
	
	
  
  

  public String getCareer() {
		return career;
	}

	public void setCareer(String career) {
		this.career = career;
	}

public String getSubtitle() {
	return subtitle;
}

public void setSubtitle(String subtitle) {
	this.subtitle = subtitle;
}

public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getUserid() {
    return userid;
  }

  public void setUserid(int userid) {
    this.userid = userid;
  }

  public int getEnabled() {
    return enabled;
  }

  public void setEnabled(int enabled) {
    this.enabled = enabled;
  }

  public Date getDate_created() {
    return date_created;
  }

  public void setDate_created(Date date_created) {
    this.date_created = date_created;
  }

  public Date getLast_updated() {
    return last_updated;
  }

  public void setLast_updated(Date last_updated) {
    this.last_updated = last_updated;
  }

  public int getView_count() {
    return view_count;
  }

  public void setView_count(int view_count) {
    this.view_count = view_count;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
  public String getTags() {
    return tags;
  }

  public void setTags(String tags) {
    this.tags = tags;
  }

  public String getJob_type() {
    return job_type;
  }

  public void setJob_type(String job_type) {
    this.job_type = job_type;
  }

  public String getJob_time() {
    return job_time;
  }

  public void setJob_time(String job_time) {
    this.job_time = job_time;
  }

  public String getJob_dept() {
    return job_dept;
  }

  public void setJob_dept(String job_dept) {
    this.job_dept = job_dept;
  }

  public String getScale() {
    return scale;
  }

  public void setScale(String scale) {
    this.scale = scale;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public int getClosed() {
    return closed;
  }

  public void setClosed(int closed) {
    this.closed = closed;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getPeriod() {
    return period;
  }

  public void setPeriod(String period) {
    this.period = period;
  }

  public int getCategory_id() {
    return category_id;
  }

  public void setCategory_id(int category_id) {
    this.category_id = category_id;
  }

  public int getAccuse() {
    return accuse;
  }

  public void setAccuse(int accuse) {
    this.accuse = accuse;
  }

}
