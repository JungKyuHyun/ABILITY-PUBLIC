package com.ability.dto;
import java.sql.Date;

public class Job_Vote {
  private int job_id;
  private Date date_created;
  private int voter;
  private int counta;

  public int getJob_id() {
    return job_id;
  }

  public void setJob_id(int job_id) {
    this.job_id = job_id;
  }

  public Date getDate_created() {
    return date_created;
  }

  public void setDate_created(Date date_created) {
    this.date_created = date_created;
  }

  public int getVoter() {
    return voter;
  }

  public void setVoter(int voter) {
    this.voter = voter;
  }

  public int getCounta() {
    return counta;
  }

  public void setCounta(int counta) {
    this.counta = counta;
  }

}
